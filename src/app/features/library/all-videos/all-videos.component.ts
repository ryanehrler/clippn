import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { TdLoadingService } from '@covalent/core';
import { of } from 'rxjs';

import {
  FileStorageService,
  LocalVideo,
  LocalVideoService,
  NodejsService,
  VideoThumbnailService,
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
  isThumbnailLoading = true;

  constructor(
    private router: Router,
    private localVideoService: LocalVideoService,
    private videoUrlService: VideoUrlService,
    private nodejsService: NodejsService,
    private sanitizer: DomSanitizer,
    private videoThumbnailService: VideoThumbnailService
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
    this.isThumbnailLoading = true;
    this.localVideoService.getLocalVideos().subscribe(
      (videos: LocalVideo[]) => {
        this.localVideos = videos;
        this.generateThumbnails(videos);
        this.isLoading = false;
      },
      error => {
        console.log('Open Folder - Timed Out');
      }
    );
  }

  openVideoAnalysis(video: LocalVideo) {
    this.videoUrlService.storeVideoUrl(video.path, video.fileName);
    this.router.navigate(['/analyzer/add-video', video.fileName]);
  }

  generateThumbnails(videos: LocalVideo[]) {
    this.videoThumbnailService.generate(videos).subscribe(
      val => {
        console.log('Video Complete: ', val.fileName);
      },
      error => {
        console.log('Error Loading Thumbnails');
      },
      () => {
        // Completed
        this.isThumbnailLoading = false;
      }
    );
  }
}
