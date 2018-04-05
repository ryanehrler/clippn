import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import { ElectronService } from '../electron/electron.service';
import { NodejsService } from '../electron/nodejs.service';

import { LocalVideo } from '..';

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

    const boundReaddir: any = Observable.bindCallback(
      this.nodejsService.fs.readdir
    );
    return boundReaddir(this.folder).map(result => {
      // result[0] = err
      // result[1] = folders
      return this.readdirCallback(result[0], result[1]);
    });
  }

  private readdirCallback(err, folders): LocalVideo[] {
    // grab only .mp4 files
    const localVideos = _.filter(folders, folder => {
      return this.nodejsService.path.extname(folder) == '.mp4';
    }).map(folder => {
      return new LocalVideo(folder, null);
    });

    return localVideos;
  }
}
