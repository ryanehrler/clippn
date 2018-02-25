import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileStorageService } from '../../../core/services/file-storage/file-storage.service';

import { Clip, ClipService, Poi } from '../../../core/services/clip/index';
import {
  GameAnalyzerService,
  IGameAnalyzer,
  PoiAnalyzerService
} from '../../../core/services/game-analyzer/index';
import {
  EventCategory,
  GoogleAnalyticsService
} from '../../../core/services/google-analytics/index';

@Component({
  selector: 'app-analyze-video',
  templateUrl: './analyze-video.component.html',
  styleUrls: ['./analyze-video.component.scss']
})
export class AnalyzeVideoComponent implements OnInit, OnDestroy {
  frameRate = 29.97; // THIS NEEDS TO BE PULLED FROM VIDEO NOT HARDCODED
  totalFrameCount: number;
  currentAnalysisFPS: number;

  videoFile: File;
  videoFileUrl: SafeUrl;
  gameAnalyzer: IGameAnalyzer;
  clip: Clip;
  video: any;
  currentTime: string;
  stopwatch: number;

  startAnalysis = false;

  webGl: any;
  canvas2d: any;

  @ViewChild('videoPlayer') videoPlayer: any;
  @ViewChild('myCanvas') myCanvas: any;
  @ViewChild('myCanvasTwo') myCanvasTwo: any;
  @ViewChildren('p') popOver: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private clipService: ClipService,
    private fileStorageService: FileStorageService,
    private injector: Injector,
    private gameAnalyzerService: GameAnalyzerService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private poiAnalyzerService: PoiAnalyzerService
  ) {}

  ngOnInit() {
    this.clip = this.clipService.clip;
    if (this.clip != null) {
      this.videoFile = this.fileStorageService.getFile(
        this.clipService.clip.name
      );
      this.videoFileUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.videoFile)
      );

      // We provide each of the services to @analyzer.component.ts then grab the one we need, these
      // services will be singletons to each "analyzer" so they should be provided whereever the clipService is
      if (this.clip.gameTitle == null) {
        this.router.navigate(['404']);
      }
      this.gameAnalyzer = this.injector.get(
        this.gameAnalyzerService.analyzerMap[this.clip.gameTitle]
      );

      // Setup the video element
      this.setVideoElementIfNull();
    } else {
      this.router.navigate(['add-video']);
    }
  }
  ngOnDestroy() {
    this.saveClip();
  }

  analyzeVideo() {
    // GA - AnalyzeVideo
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'AnalyzeVideo',
      'Start'
    );

    this.setVideoElementIfNull();
    this.startAnalysis = true;
    this.incrementVideoFrame();
  }

  saveClip() {
    // GA - SaveClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'SaveClip'
    );

    if (this.clip != null) {
      this.clipService.saveClip(this.clip);
    }
  }
  analyzeFireLevels() {
    // GA - AnalyzeKillFeed
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'AnalyzeKillFeed'
    );

    this.clip.pois = this.poiAnalyzerService.analyzeKillFeed(
      this.clip.pois,
      this.gameAnalyzer.fireThresholdSeconds
    );
  }

  toggleVideo(event: any) {
    this.videoPlayer.nativeElement.play();
  }

  resetVideo() {
    // GA - ResetVideo
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'ResetVideo'
    );

    this.video.currentTime = 0;
    this.startAnalysis = false;
    this.gameAnalyzer.reset();
  }
  setVideoElementIfNull() {
    if (this.video == null) {
      this.setVideoElement();
    }
  }

  setVideoElement() {
    this.video = this.videoPlayer.nativeElement;

    const width = this.gameAnalyzer.width;
    const height = this.gameAnalyzer.height;

    // Load Canvas2d Context
    this.canvas2d = this.myCanvasTwo.nativeElement.getContext('2d');
    this.canvas2d.width = width;
    this.canvas2d.height = height;

    // Load WebGL bullshit
    const c = this.myCanvas.nativeElement;

    c.width = width;
    c.height = height;
    this.webGl = c.getContext('webgl');

    const tex = this.webGl.createTexture();
    this.webGl.bindTexture(this.webGl.TEXTURE_2D, tex);

    const fbo = this.webGl.createFramebuffer();
    this.webGl.bindFramebuffer(this.webGl.FRAMEBUFFER, fbo);
    this.webGl.viewport(0, 0, width, height);
    this.webGl.framebufferTexture2D(
      this.webGl.FRAMEBUFFER,
      this.webGl.COLOR_ATTACHMENT0,
      this.webGl.TEXTURE_2D,
      tex,
      0
    );
  }

  setNumberOfFrames() {
    if (this.video == null) {
      this.setVideoElementIfNull();
    }

    const analysisFPS = this.gameAnalyzer.analysisFPS;

    this.totalFrameCount = Math.round(
      this.video.duration * this.frameRate / analysisFPS - analysisFPS * 2
    );
  }

  incrementVideoFrame() {
    this.video.currentTime += 1 / this.gameAnalyzer.analysisFPS;
    // 1s / (frame_rate / frames)
  }

  onFrameLoad() {
    if (this.startAnalysis) {
      this.processVideo();
    }
    this.updateAnalysisFPS();
    this.setCurrentTime();
  }
  setCurrentTime() {
    let t = 0;
    if (this.video != null) {
      t = this.video.currentTime;
    }

    this.currentTime = moment('2000-01-01 00:00:00')
      .seconds(Math.round(t))
      .format('HH:mm:ss');
  }
  private updateAnalysisFPS() {
    if (this.stopwatch) {
      this.stopwatch = moment().milliseconds();
    }
    const current = moment().milliseconds();
    const timeDif = current - this.stopwatch;
    console.log(timeDif, current, this.stopwatch);

    this.currentAnalysisFPS = 1000 / timeDif;
    this.stopwatch = current;
  }
  processVideo() {
    const currentTime = this.video.currentTime;
    const killDetected = this.gameAnalyzer.processVideo(
      this.webGl,
      this.canvas2d,
      this.video,
      currentTime
    );

    if (killDetected) {
      const displayTime = moment('2000-01-01 00:00:00')
        .seconds(Math.round(currentTime))
        .format('HH:mm:ss');

      this.clip.pois.push({
        time: currentTime,
        displayTime,
        fireLevel: '',
        tags: [],
        deleted: false
      });
      this.analyzeFireLevels();
    }

    if (currentTime < this.video.duration - 1) {
      this.incrementVideoFrame();
    } else {
      // GA - AnalyzeVideo
      this.googleAnalyticsService.emitEvent(
        EventCategory.Analyzer.toString(),
        'AnalyzeVideo',
        'End'
      );

      this.startAnalysis = false;
      this.saveClip();
    }
  }

  seekTime(seconds: number) {
    this.video.currentTime = this.video.currentTime + seconds;
  }
  gotoKill(time: number) {
    this.closePopovers();
    this.setVideoElementIfNull();
    this.video.currentTime = time - 1;
  }
  deleteKill(kill: Poi) {
    kill.deleted = true;
  }
  addTag(kill: Poi) {
    kill.tags.push({ value: '', deleted: false });
  }
  deleteTag(kill: Poi, index: number) {
    _.pullAt(kill.tags, [index]);
  }
  closePopovers() {
    _.forEach(this.popOver.toArray(), element => {
      element.close();
    });
  }
}
