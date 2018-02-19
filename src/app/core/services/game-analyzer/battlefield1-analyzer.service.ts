import { Injectable } from '@angular/core';
import { IGameAnalyzer } from './IGameAnalyzer';

@Injectable()
export class Battlefield1AnalyzerService implements IGameAnalyzer {
  missedDetection = 0;

  constructor() {}

  processVideo() {
    console.log('battlefield1-process-video');
    return true;
  }
  hasPoi() {
    return true;
  }
}
