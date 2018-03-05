import { Injectable } from '@angular/core';

import { AnalyzerListItem } from '.';
import { Battlefield1AnalyzerService } from './battlefield1-analyzer.service';
import { FortniteAnalyzerService } from './fortnite-analyzer.service';

@Injectable()
export class GameAnalyzerService {
  analyzerMap = {
    battlefield1: Battlefield1AnalyzerService,
    fortnite: FortniteAnalyzerService
  };

  // The key should match a key in the analyzerMap
  analyzerList: AnalyzerListItem[] = [
    { key: 'battlefield1', display: 'Battlefield 1' },
    { key: 'fortnite', display: 'Fortnite' }
  ];
  constructor() {}
}
