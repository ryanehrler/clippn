import { Injectable } from '@angular/core';

import { GameAnalyzerBase } from './game-analyzer-base';
import { IGameAnalyzer } from './IGameAnalyzer';

@Injectable()
export class FortniteAnalyzerService extends GameAnalyzerBase
  implements IGameAnalyzer {
  width = 110;
  height = 90;
  xStart = 979;
  yStart = 650;

  totalFrameCount = 0;
  analysisFPS = 5;
  missedKillDetectionThreshold = 2;
  durationOfKill = 1.8;
  fireThresholdSeconds = 10;

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
    return true;
  }

  processVideo() {
    console.log('fortnite-process-video');
    return true;
  }

  reset() {
    this.resetDetections();
  }
}
