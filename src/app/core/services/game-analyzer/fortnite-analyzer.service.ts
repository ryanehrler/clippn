import { Injectable } from '@angular/core';
import { IGameAnalyzer } from './IGameAnalyzer';

@Injectable()
export class FortniteAnalyzerService implements IGameAnalyzer {
  missedDetection = 0;

  constructor() {}

  processVideo() {
    console.log('fortnite-process-video');
    return true;
  }
  hasPoi() {
    return true;
  }
}
