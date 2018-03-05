import { Injectable } from '@angular/core';

import { GameAnalyzerBase } from './game-analyzer-base';
import { IGameAnalyzer } from './IGameAnalyzer';

@Injectable()
export class FortniteAnalyzerService extends GameAnalyzerBase
  implements IGameAnalyzer {
  baseWidth = 110;
  baseHeight = 90;
  baseXStart = 979;
  baseYStart = 650;

  width: number;
  height: number;
  xStart: number;
  yStart: number;

  totalFrameCount = 0;
  missedKillDetectionThreshold = 2;
  durationOfKill = 1.8;
  fireThresholdSeconds = 10;

  analysisFPS = 5;
  analysisVideoWidth = 1920;
  analysisVideoHeight = 1080;

  pixelRedValue = 154;
  pixelGreenValue = 47;
  pixelBlueValue = 54;
  pixelRedTolerance = 15;
  pixelGreenTolerance = 15;
  pixelBlueTolerance = 35;

  constructor() {
    super();
  }

  hasPoi(colorArray: Uint8Array) {
    // console.log('fortnite-has-poi');
    return false;
  }

  processVideo() {
    // console.log('fortnite-process-video');
    if (this.isResolutionSet()) {
      return false;
    }
    return false;
  }

  reset() {
    this.resetDetections();
  }
  setVideoResolution(userVideoWidth: number, userVideoHeight: number) {
    this.setVideoResolutionBase(
      userVideoWidth,
      userVideoHeight,
      this.analysisVideoWidth,
      this.analysisVideoHeight,
      this.baseWidth,
      this.baseHeight,
      this.baseXStart,
      this.baseYStart
    );

    this.width = this.scaledWidth;
    this.height = this.scaledHeight;
    this.xStart = this.scaledXStart;
    this.yStart = this.scaledYStart;
  }
}
