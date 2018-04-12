import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as _ from 'lodash';

import {
  FileStorageService,
  LocalVideo,
  LocalVideoService,
  NodejsService,
  VideoUrlService
} from '../../../core/services';
import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
  folder: string;
  constructor(
    private router: Router,
    private localVideoService: LocalVideoService,
    private videoUrlService: VideoUrlService,
    private nodejsService: NodejsService,
    private sanitizer: DomSanitizer
  ) {}

  localVideos: LocalVideo[];
  videoPath: string;
  videoFileUrl: SafeUrl;
  showVideo: boolean;
  loading: boolean;

  ngOnInit() {
    this.openFolder();
  }

  openFolder() {
    this.localVideoService
      .getLocalVideos()
      .subscribe((videos: LocalVideo[]) => {
        this.localVideos = videos;
        this.loading = true;
      });
  }

  openVideoAnalysis(video: LocalVideo) {
    this.videoUrlService.storeVideoUrl(video.path, video.fileName);
    this.router.navigate(['/analyzer/add-video', video.fileName]);
  }
}
