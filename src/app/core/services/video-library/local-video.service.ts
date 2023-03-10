import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { bindCallback, Observable, of } from 'rxjs';

import { map, retry, tap, timeout } from 'rxjs/operators';
import { ElectronService } from '../electron/electron.service';
import { NodejsUtilityService } from '../electron/nodejs-utility.service';
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
    private nodejsService: NodejsService,
    private nodeUtilService: NodejsUtilityService
  ) {}

  getFolder() {
    return this.folder;
  }
  setFolder() {
    if (this.electronService.remote != null) {
      this.folder = this.electronService.remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      })[0];
    }

    return this.folder;
  }
  getLocalVideos(): Observable<LocalVideo[]> {
    if (!this.folder) {
      this.setFolder();
    }

    if (this.nodejsService.fs != null) {
      const readdirBind: any = bindCallback(this.nodejsService.fs.readdir);
      return readdirBind(this.folder).pipe(
        map(result => {
          // result[0] = err
          // result[1] = folders
          return this.readdirCallback(result[0], result[1], this.folder);
        })
      );
    } else {
      return of([new LocalVideo('', '', 'Not in Electron', null)]);
    }
  }

  getVideoFile(path: string): Observable<File> {
    const readFileBind: any = bindCallback(this.nodejsService.fs.readFile);

    return readFileBind(path).pipe(
      map(result => {
        return this.readFileCallback(result[0], result[1]);
      })
    );
  }

  private readdirCallback(
    err: any,
    fileNames: string[],
    folderPath: string
  ): LocalVideo[] {
    // grab only .mp4 files
    const localVideos = _
      .filter(fileNames, (fileName: string) => {
        return this.nodeUtilService.getExtension(fileName) == '.mp4';
      })
      .map(fileName => {
        const path = folderPath + '\\' + fileName;
        const name = this.nodeUtilService.getFileName(fileName);
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
