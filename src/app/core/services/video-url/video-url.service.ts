import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { FileStorageService } from '../file-storage/file-storage.service';
import { VideoUrl } from './video-url';

/**
 * Store video with safeUrl for video elements
 *
 * @export
 * @class VideoUrlService
 */
@Injectable()
export class VideoUrlService {
  urls: SafeUrl[] = [];

  constructor(
    private fileStorageService: FileStorageService,
    private sanatizer: DomSanitizer
  ) {}

  /**
   * Returns SafeUrl from the stored urls.
   *
   * If you get null from this function then it means the file/name was not stored yet.
   *
   * @param {string} name
   * @returns {SafeUrl}
   * @memberof VideoUrlService
   */
  getUrl(name: string): SafeUrl {
    console.log('VideoUrlService -> get-url: ', name);
    return this.urls[name];
  }

  /**
   * Store video url as SafeUrl
   *
   * @param {string} url
   * @memberof VideoUrlService
   */
  storeVideoUrl(url: string, name: string) {
    this.urls[name] = this.sanatizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Store a file's safeUrl and also saves to FileStorageService.
   *
   * @param {File} file
   * @memberof VideoUrlService
   */
  storeFile(file: File) {
    this.fileStorageService.addFile(file);
    const url = URL.createObjectURL(file);
    this.storeVideoUrl(url, file.name);
  }
}
