import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  LocalVideo,
  LocalVideoService,
  VideoThumbnailService,
  VideoUrlService
} from '../../../core/services';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
  folder: string;
  localVideos: Observable<LocalVideo[]>;
  videoPath: string;
  baseThumbnailPath: string;
  videoFileUrl: SafeUrl;
  showVideo: boolean;

  isLoading = true;
  isThumbnailLoading = true;

  constructor(
    private router: Router,
    private localVideoService: LocalVideoService,
    private videoUrlService: VideoUrlService,
    private sanitizer: DomSanitizer,
    private videoThumbnailService: VideoThumbnailService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.baseThumbnailPath = this.videoThumbnailService.getThumbnailPath();

    this.folder = this.localVideoService.getFolder();
    this.openFolder();
  }

  changeFolder() {
    this.folder = this.localVideoService.setFolder();
    this.openFolder();
  }

  openFolder() {
    this.isThumbnailLoading = true;
    this.isLoading = true;
    this.localVideos = this.localVideoService.getLocalVideos().pipe(
      tap(
        (videos: LocalVideo[]) => {
          console.log('local-video-load-complete');
          this.isLoading = false;
          this.generateThumbnails(videos);
        },
        error => {
          console.log('Open Folder - Timed Out');
        }
      )
    );
  }

  openVideoAnalysis(video: LocalVideo) {
    this.videoUrlService.storeVideoUrl(video.path, video.fileName);
    this.router.navigate(['/analyzer/add-video', video.fileName]);
  }

  generateThumbnails(videos: LocalVideo[]) {
    let count = 0;
    this.videoThumbnailService.generate(videos).subscribe(
      val => {
        count++;
        console.log('Video Complete: ', val.fileName);
      },
      error => {
        console.log('Error Loading Thumbnails');
      },
      () => {
        // Completed
        console.log('thumbnail-complete');
        // HACK - Unfortunately this method returns before the files are actually finished writing to disk.
        // So we need to wait until they are created.  This may not be perfect but it worked for me everytime.
        // What we need to do is get a file watcher on the thumbnail directory and only procuess the SafeUrl
        // if the file exists.
        const timeout = count * 200;
        setTimeout(() => {
          this.isThumbnailLoading = false;
          this.generateSafeUrl(videos);
          return; // this probably doesn't do anything but I'm just throwing
          // shit at the wall at this point on the wierd library hanging issue
        }, timeout);
      }
    );
  }

  private generateSafeUrl(videos: LocalVideo[]) {
    _.each(videos, video => {
      console.log('Generate-safe-url: ', video.name);

      const path = this.baseThumbnailPath + video.name + '.jpeg';
      video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(path);
    });

    // Angular change detection does not fire when reaching out to nodejs(electron).
    // So we need to help angular and let it know it needs to detect changes so it
    // can update the binding to the dom.
    this.changeDetector.detectChanges();
  }
}
