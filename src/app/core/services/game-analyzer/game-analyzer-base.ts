export class GameAnalyzerBase {
  detections = [];
  currentKillDetections = 0;
  currentMissedKillDetections = 0;
  videoWidth: number;
  videoHeight: number;
  widthScale: number;
  heightScale: number;

  scaledWidth: number;
  scaledHeight: number;
  scaledXStart: number;
  scaledYStart: number;

  // Variables used during frame process so we reuse instead of create new vars to be gc'UNSIGNED_BYTE
  pixelArray: Uint8Array;
  r: number;
  g: number;
  b: number;

  isAround(pixelColor: number, desiredColor: number, range: number) {
    return (
      desiredColor - range < pixelColor && desiredColor + range > pixelColor
    );
  }

  addDetection() {
    this.detections.push(1);
  }
  missedDetection() {
    this.detections.push(0);
    this.currentMissedKillDetections++;
  }
  processKillDetectionCounts(
    currentTime: number,
    analysisFPS: number,
    durationOfKill: number,
    missedKillDetectionThreshold: number
  ) {
    let detectedKill = false;
    this.currentKillDetections++;

    // Register a kill
    if (this.currentKillDetections >= analysisFPS * durationOfKill) {
      detectedKill = true;
      this.currentKillDetections = 0;
      this.currentMissedKillDetections = 0;
    } else if (
      this.currentMissedKillDetections >
      missedKillDetectionThreshold - 1
    ) {
      // Reset kill detection
      this.currentKillDetections = 0;
      this.currentMissedKillDetections = 0;
    }

    return detectedKill;
  }

  resetDetections() {
    this.detections = [];
  }
  setVideoResolutionBase(
    width: number,
    height: number,
    analysisVideoWidth: number,
    analysisVideoHeight: number,
    analyzerWidth: number,
    analyzerHeight: number,
    xStart: number,
    yStart: number
  ) {
    this.videoWidth = width;
    this.videoHeight = height;

    this.widthScale = Math.round((width / analysisVideoWidth) * 100) / 100;
    this.heightScale = Math.round((height / analysisVideoHeight) * 100) / 100;

    this.scaledWidth = Math.round(analyzerWidth * this.widthScale);
    this.scaledHeight = Math.round(analyzerHeight * this.heightScale);
    this.scaledXStart = Math.round(xStart * this.widthScale);
    this.scaledYStart = Math.round(yStart * this.heightScale);
  }

  isResolutionSet() {
    if (this.scaledWidth <= 0) {
      console.log('*RED ALERT*');
      console.log(
        'Please call setVideoResolution() and pass the video width/height.'
      );
      console.log(
        'Use loadedmetadata event listener on video element.  Get from srcElement.videoWidth'
      );

      return false;
    }

    return true;
  }
}
