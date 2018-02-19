import { Injectable } from '@angular/core';
import { Battlefield1AnalyzerService } from './battlefield1-analyzer.service';
import { FortniteAnalyzerService } from './fortnite-analyzer.service';

@Injectable()
export class GameAnalyzerService {
  analyzerMap = {
    battlefield1: Battlefield1AnalyzerService,
    fortnite: FortniteAnalyzerService
  };

  constructor() {}
}
