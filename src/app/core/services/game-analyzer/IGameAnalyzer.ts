export interface IGameAnalyzer {
  width: number;
  height: number;
  xStart: number;
  yStart: number;

  totalFrameCount: number;
  analysisFPS: number;
  missedKillDetectionThreshold: number;
  durationOfKill: number;
  fireThresholdSeconds: number;

  pixelRedValue: number;
  pixelGreenValue: number;
  pixelBlueValue: number;
  pixelRedTolerance: number;
  pixelGreenTolerance: number;
  pixelBlueTolerance: number;

  processVideo(
    webGl: any,
    canvas2d: any,
    video: any,
    currentTime: any
  ): boolean;
  hasPoi(colorArray: Uint8Array): boolean;
  reset();
}
