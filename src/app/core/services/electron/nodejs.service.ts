import { Injectable } from '@angular/core';
declare let window;

@Injectable()
export class NodejsService {
  constructor() {}

  private _electron: any;
  public get electron(): any {
    if (!this._electron) {
      if (window && window.require) {
        this._electron = window.require('electron');
        console.log('electron: ', this._electron);
        return this._electron;
      }
      return null;
    }
    return this._electron;
  }
  private _os: any;
  public get os(): any {
    if (!this._os) {
      if (window && window.require) {
        this._os = window.require('os');
        return this._os;
      }
      return null;
    }
    return this._os;
  }

  private _fs: any;
  public get fs(): any {
    if (!this._fs) {
      if (window && window.require) {
        this._fs = window.require('fs');
        return this._fs;
      }
      return null;
    }
    return this._fs;
  }

  private _path: any;
  public get path(): any {
    if (!this._path) {
      if (window && window.require) {
        this._path = window.require('path');
        return this._path;
      }
      return null;
    }
    return this._path;
  }

  private _FileAPI: any;
  public get FileAPI(): any {
    if (!this._FileAPI) {
      if (window && window.require) {
        this._FileAPI = window.require('file-api');
        return this._FileAPI;
      }
      return null;
    }
    return this._FileAPI;
  }

  private _ffmpeg: any;
  public get ffmpeg(): any {
    if (!this._ffmpeg) {
      if (window && window.require) {
        this._ffmpeg = window.require('fluent-ffmpeg');
        this._ffmpeg.setFfmpegPath(this.fixAsarPath(this.ffmpegStatic.path));
        this._ffmpeg.setFfprobePath(this.fixAsarPath(this.ffprobeStatic.path));
        return this._ffmpeg;
      }
      return null;
    }
    return this._ffmpeg;
  }

  private _ffmpegStatic;
  public get ffmpegStatic(): any {
    if (!this._ffmpegStatic) {
      if (window && window.require) {
        this._ffmpegStatic = window.require('ffmpeg-static');
        return this._ffmpegStatic;
      }
      return null;
    }
    return this._ffmpegStatic;
  }
  private _ffprobeStatic;
  public get ffprobeStatic(): any {
    if (!this._ffprobeStatic) {
      if (window && window.require) {
        this._ffprobeStatic = window.require('ffprobe-static');
        return this._ffprobeStatic;
      }
      return null;
    }
    return this._ffprobeStatic;
  }

  /// executables cannot be in the app.asar, this is a hack to point to app.asar.unpacked which is where the binary is located.
  private fixAsarPath(path: string) {
    return path.replace('app.asar', 'app.asar.unpacked');
  }
}
