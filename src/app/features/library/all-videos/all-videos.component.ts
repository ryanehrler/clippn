import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { TdLoadingService } from '@covalent/core';
import {
  FileStorageService,
  LocalVideo,
  LocalVideoService,
  NodejsService,
  VideoUrlService
} from '../../../core/services';
import { FrameExtractorService } from '../../../core/services/electron/frame-extractor.service';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
  folder: string;
  localVideos: LocalVideo[];
  videoPath: string;
  videoFileUrl: SafeUrl;
  showVideo: boolean;
  isLoading = true;

  constructor(
    private router: Router,
    private localVideoService: LocalVideoService,
    private videoUrlService: VideoUrlService,
    private nodejsService: NodejsService,
    private sanitizer: DomSanitizer,
    private frameExtractor: FrameExtractorService
  ) {}

  ngOnInit() {
    this.folder = this.localVideoService.getFolder();
    this.openFolder();
  }

  changeFolder() {
    this.folder = this.localVideoService.setFolder();
    this.openFolder();
  }

  openFolder() {
    this.localVideoService
      .getLocalVideos()
      .subscribe((videos: LocalVideo[]) => {
        this.localVideos = videos;
        this.isLoading = false;
      });
  }

  openVideoAnalysis(video: LocalVideo) {
    // this.frameExtractor.extractFrames(video.path, progress => {
    //   console.log('fuck', progress);
    // });
    this.videoUrlService.storeVideoUrl(video.path, video.fileName);
    this.router.navigate(['/analyzer/add-video', video.fileName]);
  }
}
