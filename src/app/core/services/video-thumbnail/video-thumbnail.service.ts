import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { bindCallback, from, Observable, of } from 'rxjs';
import { concat, concatMap, map, tap } from 'rxjs/operators';

import { FrameExtractorService } from '../electron/frame-extractor.service';
import { NodejsUtilityService } from '../electron/nodejs-utility.service';
import { NodejsService } from '../electron/nodejs.service';
import { LocalVideo } from '../video-library/local-video';

@Injectable({
  providedIn: 'root'
})
export class VideoThumbnailService {
  private ROOT_PATH = 'thumbnails/';

  constructor(
    private frameExtractorService: FrameExtractorService,
    private nodejsService: NodejsService,
    private nodeUtilService: NodejsUtilityService
  ) {}

  generate(videos: LocalVideo[]): Observable<LocalVideo> {
    const missingVideos = this.getMissingVideos(videos);

    return missingVideos.pipe(
      concatMap(missingVideo => this.takeScreenshots(missingVideo))
    );
  }

  getName(name: string) {
    return this.ROOT_PATH + name;
  }

  private takeScreenshots(videos: LocalVideo[]): Observable<LocalVideo> {
    return from(videos).pipe(
      tap((video: LocalVideo) => {
        this.frameExtractorService.takeScreenshot(
          video.path,
          3,
          this.getName(video.name)
        );
      })
    );
  }
  private getMissingVideos(videos: LocalVideo[]): Observable<LocalVideo[]> {
    const folder = './clipImages/' + this.ROOT_PATH;
    if (this.nodejsService.fs != null) {
      const readdirBind: any = bindCallback(this.nodejsService.fs.readdir);
      return readdirBind(folder).pipe(
        map(result => {
          // result[0] = err

          // remove the file extension from resultt
          const existingVideos = _
            .chain(result[1])
            // .each()
            .map(fileName => {
              return this.nodeUtilService.getFileName(fileName);
            })
            .value();

          const missingVideos = _.filter(videos, video => {
            return (
              _.findIndex(existingVideos, existing => {
                return existing === video.name;
              }) < 0
            );
          });

          return missingVideos;
        })
      );
    } else {
      return of();
    }
  }
}
