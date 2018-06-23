import { Injectable } from '@angular/core';
import { NodejsService } from '../electron/nodejs.service';
import { VideoThumbnailService } from '../video-thumbnail/video-thumbnail.service';
import { NodejsUtilityService } from '../electron/nodejs-utility.service';

@Injectable({
  providedIn: 'root'
})
export class AppDataFolderInitService {
  constructor(
    private nodejsService: NodejsService,
    private nodejsUtilityService: NodejsUtilityService,
    private thumbnailService: VideoThumbnailService
  ) {}

  run() {
    const root = this.nodejsUtilityService.getLocalAppDataFolder();
    this.mkdir(root);
    const thumbnail = this.thumbnailService.getThumbnailPath();
    this.mkdir(thumbnail);
  }

  // We are wrapping the mkdir() in a try catch because it will throw an error if the folder already exists.
  // This is sort of a hack, but because this code only runs once upon app initiliazation
  // then it's not worth spending time first checking if the folder exists.
  mkdir(path: string) {
    try {
      this.nodejsService.fs.mkdirSync(path);
    } catch (error) {
      // console.log('folder exists: ', error);
    }
  }
}
