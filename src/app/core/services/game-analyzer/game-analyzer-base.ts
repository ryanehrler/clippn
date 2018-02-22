export class GameAnalyzerBase {
  detections = [];
  currentKillDetections = 0;
  currentMissedKillDetections = 0;

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
}
