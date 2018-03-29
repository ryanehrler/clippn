import { Injectable } from '@angular/core';

import * as Electron from 'electron';

declare let window;

@Injectable()
export class ElectronService {
  constructor() {}

  private _electron: Electron.RendererInterface;
  private _fs: any;

  private get electron(): Electron.RendererInterface {
    if (!this._electron) {
      if (window && window.require) {
        this._electron = window.require('electron');
        return this._electron;
      }
      return null;
    }
    return this._electron;
  }
  private get fs(): any {
    if (!this._fs) {
      if (window && window.require) {
        this._fs = window.require('fs');
        return this._fs;
      }
      return null;
    }
    return this._fs;
  }

  /**
   * determines if SPA is running in Electron
   * @returns {boolean}
   */
  public get isElectronApp(): boolean {
    return !!window.navigator.userAgent.match(/Electron/);
  }

  public get desktopCapturer(): Electron.DesktopCapturer {
    return this.electron ? this.electron.desktopCapturer : null;
  }

  public get ipcRenderer(): Electron.IpcRenderer {
    return this.electron ? this.electron.ipcRenderer : null;
  }

  public get remote(): Electron.Remote {
    return this.electron ? this.electron.remote : null;
  }

  public get webFrame(): Electron.WebFrame {
    return this.electron ? this.electron.webFrame : null;
  }

  public get clipboard(): Electron.Clipboard {
    return this.electron ? this.electron.clipboard : null;
  }

  public get crashReporter(): Electron.CrashReporter {
    return this.electron ? this.electron.crashReporter : null;
  }

  public get process(): NodeJS.Process {
    return this.remote ? this.remote.process : null;
  }

  public get nativeImage(): typeof Electron.nativeImage {
    return this.electron ? this.electron.nativeImage : null;
  }

  public get screen(): Electron.Screen {
    return this.electron ? this.electron.screen : null;
  }

  public get shell(): Electron.Shell {
    return this.electron ? this.electron.shell : null;
  }

  public get fileSystem(): any {
    return this.fs;
  }
}
