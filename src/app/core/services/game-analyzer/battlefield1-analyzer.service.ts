import { Injectable } from '@angular/core';
import { GameAnalyzerBase } from './game-analyzer-base';
import { IGameAnalyzer } from './IGameAnalyzer';

@Injectable()
export class Battlefield1AnalyzerService extends GameAnalyzerBase
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
    let kill = false;
    let index = 0;
    while (index < colorArray.length) {
      // RGB (124, 60, 58)
      const red = colorArray[index];
      const green = colorArray[index + 1];
      const blue = colorArray[index + 2];

      // console.log(red, green, blue);
      if (
        this.isAround(red, this.pixelRedValue, this.pixelRedTolerance) &&
        this.isAround(green, this.pixelGreenValue, this.pixelGreenTolerance) &&
        this.isAround(blue, this.pixelBlueValue, this.pixelBlueTolerance)
      ) {
        kill = true;
        break;
      }

      index += 4;
    }

    return kill;
  }

  processVideo(webGl: any, canvas2d: any, video: any, currentTime: any) {
    console.log('battlefield1-process-video');
    const typedArray = new Uint8Array(this.width * this.height * 4);

    webGl.texImage2D(
      webGl.TEXTURE_2D,
      0,
      webGl.RGBA,
      webGl.RGBA,
      webGl.UNSIGNED_BYTE,
      video
    );
    webGl.readPixels(
      this.xStart,
      this.yStart,
      this.width,
      this.height,
      webGl.RGBA,
      webGl.UNSIGNED_BYTE,
      typedArray
    );

    // Render video partial to canvas
    const palette = canvas2d.getImageData(0, 0, this.width, this.height);
    palette.data.set(new Uint8ClampedArray(typedArray));
    canvas2d.putImageData(palette, 0, 0);

    if (this.hasPoi(typedArray)) {
      this.addDetection();
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
}
