import { Injectable } from '@angular/core';
declare let window;

@Injectable()
export class NodejsService {
  constructor() {}

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
}
