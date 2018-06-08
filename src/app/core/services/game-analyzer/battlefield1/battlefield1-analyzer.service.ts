import { Injectable } from '@angular/core';

import { GameAnalyzerBase } from '../game-analyzer-base';
import { IGameAnalyzer } from '../IGameAnalyzer';

@Injectable()
export class Battlefield1AnalyzerService extends GameAnalyzerBase
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
    let kill = false;
    let index = 0;
    while (index < colorArray.length) {
      // RGB (124, 60, 58)
      this.r = colorArray[index];
      this.g = colorArray[index + 1];
      this.b = colorArray[index + 2];

      // console.log(red, green, blue);
      if (
        this.isAround(this.r, this.pixelRedValue, this.pixelRedTolerance) &&
        this.isAround(this.g, this.pixelGreenValue, this.pixelGreenTolerance) &&
        this.isAround(this.b, this.pixelBlueValue, this.pixelBlueTolerance)
      ) {
        kill = true;
        break;
      }

      index += 4;
    }

    return kill;
  }

  processVideo(webGl: any, canvas2d: any, video: any, currentTime: any) {
    if (!this.isResolutionSet()) {
      return false;
    }
    // console.log('battlefield1-process-video');
    const w = this.scaledWidth;
    const h = this.scaledHeight;
    const xS = this.scaledXStart;
    const yS = this.scaledYStart;
    // console.log(w, h, xS, yS);

    webGl.texImage2D(
      webGl.TEXTURE_2D,
      0,
      webGl.RGBA,
      webGl.RGBA,
      webGl.UNSIGNED_BYTE,
      video
    );
    webGl.readPixels(
      xS,
      yS,
      w,
      h,
      webGl.RGBA,
      webGl.UNSIGNED_BYTE,
      this.pixelArray
    );

    // Render video partial to canvas
    // const palette = canvas2d.getImageData(0, 0, w, h);
    // palette.data.set(new Uint8ClampedArray(typedArray));
    // canvas2d.putImageData(palette, 0, 0);

    if (this.hasPoi(this.pixelArray)) {
      this.addDetection();
      // console.log('POI Detected');
    } else {
      this.missedDetection();
    }

    return this.processKillDetectionCounts(
      currentTime,
      this.analysisFPS,
      this.durationOfKill,
      this.missedKillDetectionThreshold
    );
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

    this.pixelArray = new Uint8Array(this.width * this.height * 4);

    // console.log(
    //   'set-video-res',
    //   this.width,
    //   this.height,
    //   this.xStart,
    //   this.yStart
    // );
  }
}
