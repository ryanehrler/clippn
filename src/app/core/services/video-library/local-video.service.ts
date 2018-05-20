import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import { ElectronService } from '../electron/electron.service';
import { NodejsService } from '../electron/nodejs.service';
import { LocalVideo } from './local-video';

declare let localStorage;

@Injectable()
export class LocalVideoService {
  private get folder(): string {
    return localStorage.getItem('library.folder');
  }
  private set folder(value: string) {
    localStorage.setItem('library.folder', value);
  }

  constructor(
    private electronService: ElectronService,
    private nodejsService: NodejsService
  ) {}

  getLocalVideos(): Observable<LocalVideo[]> {
    if (!this.folder) {
      this.folder = this.electronService.remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      })[0];
    }

    const readdirBind: any = Observable.bindCallback(
      this.nodejsService.fs.readdir
    );
    return readdirBind(this.folder).map(result => {
      // result[0] = err
      // result[1] = folders
      return this.readdirCallback(result[0], result[1], this.folder);
    });
  }

  getVideoFile(path: string): Observable<File> {
    const readFileBind: any = Observable.bindCallback(
      this.nodejsService.fs.readFile
    );

    return readFileBind(path).map(result => {
      return this.readFileCallback(result[0], result[1]);
    });
  }
  getFileName(path: string) {
    const extension = this.getExtension(path);
    return this.nodejsService.path.basename(path, extension);
  }
  getExtension(path: string) {
    return this.nodejsService.path.extname(path);
  }

  private readdirCallback(
    err: any,
    fileNames: string[],
    folderPath: string
  ): LocalVideo[] {
    // grab only .mp4 files
    const localVideos = _.filter(fileNames, (fileName: string) => {
      return this.getExtension(fileName) == '.mp4';
    }).map(fileName => {
      const path = folderPath + '\\' + fileName;
      const name = this.getFileName(fileName);
      return new LocalVideo(path, fileName, name, null);
    });

    return localVideos;
  }

  private readFileCallback(err, file): File {
    if (err) {
      console.log('Could not read file: ', err);
      return null;
    }

    return file;
  }
}
