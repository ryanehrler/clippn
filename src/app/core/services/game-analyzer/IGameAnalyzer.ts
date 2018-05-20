export interface IGameAnalyzer {
  //Properties
  width: number;
  height: number;
  xStart: number;
  yStart: number;

  totalFrameCount: number;
  missedKillDetectionThreshold: number;
  durationOfKill: number;
  fireThresholdSeconds: number;

  analysisFPS: number;
  analysisVideoWidth: number;
  analysisVideoHeight: number;

  pixelRedValue: number;
  pixelGreenValue: number;
  pixelBlueValue: number;
  pixelRedTolerance: number;
  pixelGreenTolerance: number;
  pixelBlueTolerance: number;

  //Functions
  processVideo(
    webGl: any,
    canvas2d: any,
    video: any,
    currentTime: any
  ): boolean;
  hasPoi(colorArray: Uint8Array): boolean;
  reset();
  setVideoResolution(width: number, height: number);
}
