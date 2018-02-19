import { TestBed, inject } from '@angular/core/testing';

import { GameAnalyzerService } from './game-analyzer.service';

describe('GameAnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameAnalyzerService]
    });
  });

  it('should be created', inject([GameAnalyzerService], (service: GameAnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
