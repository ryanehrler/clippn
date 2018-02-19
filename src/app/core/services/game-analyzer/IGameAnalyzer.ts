export interface IGameAnalyzer {
  missedDetection: number;
  processVideo(webGl: any): boolean;
  hasPoi(colorArray: Uint8Array): boolean;
}
