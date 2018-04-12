import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit
} from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AnalysisTimeRemainingCalcService } from '../../../core/services/analysis-time-remaining-calc.service';
import { ClipTimeNavigationService } from '../../../core/services/clip/clip-time-navigation.service';
import { Clip, ClipService, Poi } from '../../../core/services/clip/index';
import { Tag } from '../../../core/services/clip/tag';
import {
  GameAnalyzerService,
  IGameAnalyzer,
  PoiAnalyzerService
} from '../../../core/services/game-analyzer/index';
import {
  EventCategory,
  GoogleAnalyticsService
} from '../../../core/services/google-analytics/index';
import { VideoUrlService } from '../../../core/services';

@Component({
  selector: 'app-analyze-video',
  templateUrl: './analyze-video.component.html',
  styleUrls: ['./analyze-video.component.scss']
})
export class AnalyzeVideoComponent implements OnInit, OnDestroy, AfterViewInit {
  frameRate = 29.97; // THIS NEEDS TO BE PULLED FROM VIDEO NOT HARDCODED
  totalFrameCount: number;
  analysisFps: number;
  analysisFpsFrameCount = 0;

  videoFile: File;
  videoFileUrl: SafeUrl;
  gameAnalyzer: IGameAnalyzer;
  clip: Clip;
  video: any;
  currentTime: string;
  currentTimeDur: moment.Duration;
  analysisTimeRemainingSec: number;
  analysisTimeRemaining: string;
  killDuration: number; // length of kill - gameAnalyzer.durationOfKill
  intervalAnalysisLength = 80;
  contextMenu = false;
  contextMenuX = 0;
  contextMenuY = 0;
  contextPoi: Poi;
  tagging: any;
  mouseCursorScrollOffset = 0;

  startAnalysis = false;

  webGl: any;
  canvas2d: any;

  @ViewChild('videoPlayer') videoPlayer: any;
  @ViewChild('myCanvas') myCanvas: any;
  @ViewChild('myCanvasTwo') myCanvasTwo: any;
  @ViewChildren('p') popOver: QueryList<ElementRef>;

  private onScroll: (e) => void;
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private clipService: ClipService,
    private videoUrlService: VideoUrlService,
    private injector: Injector,
    private gameAnalyzerService: GameAnalyzerService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private poiAnalyzerService: PoiAnalyzerService,
    private analysisTimeRemainingCalc: AnalysisTimeRemainingCalcService,
    private clipTimeNavigationService: ClipTimeNavigationService,
    private elementRef: ElementRef
  ) {
    this.onScroll = event => {
      this.mouseCursorScrollOffset = event.srcElement.scrollTop;
    };
  }

  ngOnInit() {
    this.clip = this.clipService.clip;
    if (this.clip != null) {
      if (this.clip.gameTitle == null) {
        this.router.navigate(['404']);
        return;
      }

      this.videoFileUrl = this.videoUrlService.getUrl(
        this.clipService.clip.name
      );
      console.log('video-safe-url', this.videoFileUrl);

      // We provide each of the services to @analyzer.component.ts then grab the one we need, these
      // services will be singletons to each "analyzer" so they should be provided whereever the clipService is
      this.gameAnalyzer = this.injector.get(
        this.gameAnalyzerService.analyzerMap[this.clip.gameTitle]
      );
      this.killDuration = this.gameAnalyzer.durationOfKill;

      this.clipTimeNavigationService.currentTimeSubject.subscribe(value => {
        this.gotoKill(value);
      });

      // Setup the video element - ties into loadedmetadata event
      this.setVideoElementIfNull();
    } else {
      this.router.navigate(['add-video']);
    }
  }
  ngAfterViewInit() {
    this.tagging = this.elementRef.nativeElement.offsetParent;
    this.tagging.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy() {
    this.saveClip();
    this.tagging.removeEventListener('scroll', this.onScroll);
  }

  togglePlayVideo() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }
  analyzeVideo() {
    // GA - AnalyzeVideo
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'AnalyzeVideo',
      'Start'
    );

    this.video.pause();
    this.setVideoElementIfNull();
    this.startAnalysis = true;
    this.incrementVideoFrame();
    this.analysisTimeRemainingCalc.start(
      this.analysisFpsFrameCount,
      this.analysisFps,
      this.video.duration,
      this.frameRate,
      this.totalFrameCount
    );
  }

  saveClip() {
    // GA - SaveClip
    this.googleAnalyticsService.emitEvent(
      EventCategory.Analyzer.toString(),
      'SaveClip'
    );

    if (this.clip != null) {
      console.log(this.clip);
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
  pauseAnalysis() {
    this.startAnalysis = false;
  }
  setVideoElementIfNull() {
    if (this.video == null) {
      this.setVideoElement();
    }
  }

  setVideoElement() {
    this.video = this.videoPlayer.nativeElement;
    this.setVideoPropertiesAndEvents(() => {
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
    });
  }
  setVideoPropertiesAndEvents(callback: () => void) {
    // .. Hide video controls ..
    this.video.controls = false;

    this.video.addEventListener(
      'loadedmetadata',
      e => {
        const width = e.srcElement.videoWidth;
        const height = e.srcElement.videoHeight;
        console.log('video resolution', width, height, e);
        this.gameAnalyzer.setVideoResolution(width, height);
        callback();
      },
      false
    );
  }
  setNumberOfFrames() {
    if (this.video == null) {
      this.setVideoElementIfNull();
    }

    const gameAnalysisFps = this.gameAnalyzer.analysisFPS;

    this.totalFrameCount = this.analysisTimeRemainingCalc.getTotalFrameCount(
      this.video.duration,
      gameAnalysisFps,
      this.frameRate
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
    if (this.totalFrameCount == null) {
      this.setNumberOfFrames();
    }

    this.updateAnalysisFPS();
    this.setCurrentTime();
  }

  setCurrentTime() {
    let t = 0;
    if (this.video != null) {
      t = this.video.currentTime;
    }

    this.currentTimeDur = moment.duration(t, 'seconds');
    this.currentTime = moment('2000-01-01 00:00:00')
      .seconds(Math.round(t))
      .format('HH:mm:ss');
    this.setAnalysisPercentDone();
  }
  private setAnalysisPercentDone() {
    // onFrame load is getting called as soon as analyze tab is hit this causes
    // us to drop into here and reset the progress to 0 no matter what.
    // adding this if so that if we're already at 100 we don't reset.
    // not sure we actually always want this but it fixes it for now.
    if (this.clip.currentProgress != 100) {
      this.clip.currentProgress = this.clipService.getPercentDone(
        this.video.currentTime,
        this.video.duration
      );
    }
    console.log(this.clip.currentProgress);
  }
  private updateAnalysisFPS() {
    this.analysisTimeRemainingSec = Math.round(
      this.analysisTimeRemainingCalc.update(this.video.currentTime)
    );

    this.analysisTimeRemaining = moment
      .duration(this.analysisTimeRemainingSec, 'seconds')
      .humanize();
    // .asMinutes()
    // .toString();
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

  onRightClick(event: any, poi: Poi) {
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY + this.mouseCursorScrollOffset - 65; // event.layerY + event.screenY - event.offsetY;
    this.contextMenu = true;
    this.contextPoi = poi;
    return false;
  }

  // disables the menu
  disableContextMenu() {
    this.contextMenu = false;
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
  // addTag(kill: Poi) {
  //   kill.tags.push({ value: '', deleted: false });
  // }
  deleteTag(kill: Poi, index: number) {
    _.pullAt(kill.tags, [index]);
  }
  closePopovers() {
    _.forEach(this.popOver.toArray(), element => {
      element.close();
    });
  }
}
