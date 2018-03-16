import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class AnalysisTimeRemainingCalcService {
  framesBeforeCheck = 40; // how many frame do we need to move through before we analyze fps

  stopwatch: any;
  analysisTimeRemainingSec: number;
  analysisFpsFrameCount: number;

  analysisFpsArray: number[];
  analysisFps: number;
  gameAnalysisFps: number; // FPS a game is processed at
  videoDuration: number;
  frameRate: number;
  totalFrameCount: number;

  constructor() {}

  start(
    frameCount: number,
    analysisFps: number,
    videoDuration: number,
    frameRate: number,
    totalFrameCount: number
  ) {
    this.analysisFpsFrameCount = frameCount;
    this.analysisFps = analysisFps;
    this.videoDuration = videoDuration;
    this.frameRate = frameRate;
    this.totalFrameCount = totalFrameCount;

    this.analysisFpsArray = [];
  }
  reset() {
    this.stopwatch = null;
    this.analysisFpsArray = [];
  }
  getTotalFrameCount(
    duration: number,
    gameAnalysisFps: number,
    frameRate: number
  ) {
    this.gameAnalysisFps = gameAnalysisFps;
    this.frameRate = frameRate;

    return this.getFrameCount(duration);
  }
  update(currentVideoTime: number) {
    if (this.stopwatch == null) {
      this.stopwatch = new Date();
    }

    if (this.analysisFpsFrameCount < this.framesBeforeCheck) {
      this.analysisFpsFrameCount++;
    } else {
      this.analysisFpsFrameCount = 0;

      this.setAnalysisFps();

      if (this.analysisFps > 0) {
        const remainingDuration = this.videoDuration - currentVideoTime;
        const currentFrame = this.getFrameCount(currentVideoTime);
        const remainingFrames = this.totalFrameCount - currentFrame;
        this.analysisTimeRemainingSec = remainingFrames / this.analysisFps;

        // console.log('--------------------------------------------');
        // console.log('analysis-fps', this.analysisFps);
        // console.log('time-remaining', this.analysisTimeRemainingSec);
        // console.log('total-frame-count', this.totalFrameCount);
        // console.log('current-frame', currentFrame);
        // console.log('remaining-frames', remainingFrames);
        // console.log('remaining-duration', remainingDuration);
        // console.log('video-current-time', currentVideoTime);
        // console.log('video-duration', this.videoDuration);
        // console.log('--------------------------------------------');
      }
      this.stopwatch = new Date();
    }

    return this.analysisTimeRemainingSec;
  }

  private getFrameCount(duration: number) {
    // This equation looks whack but it's right.
    // Main equation is (duration * (frameRate/gameAnalysisFps))
    // the (- gameAnalysisFps*2) is just an offset.  So we end 2 seconds before the end.
    // This was so we don't go to a frame in the video that doesn't exist if I remember
    // correctly.
    const frameCount = Math.round(
      duration * this.frameRate / this.gameAnalysisFps -
        this.gameAnalysisFps * 2
    );
    // console.log('frame-count', frameCount);

    return frameCount;
  }

  private setAnalysisFps() {
    const current = new Date();

    // This is a sucky way to get the date.  This won't work at the top of a minute.
    const stopwatch = this.stopwatch;
    const cSec =
      current.getMinutes() * 60 * 1000 +
      current.getSeconds() * 1000 +
      current.getMilliseconds();
    const sSec =
      stopwatch.getMinutes() * 60 * 1000 +
      stopwatch.getSeconds() * 1000 +
      stopwatch.getMilliseconds();

    const timeDif = cSec - sSec;
    // console.log(timeDif, current, this.stopwatch);

    const currentFps =
      Math.round(100 * (this.framesBeforeCheck / (timeDif / 1000))) / 100;

    this.analysisFpsArray.push(currentFps);
    this.analysisFps = _.mean(this.analysisFpsArray);
  }
}
