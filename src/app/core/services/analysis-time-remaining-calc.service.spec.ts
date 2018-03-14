import { TestBed, inject } from '@angular/core/testing';

import { AnalysisTimeRemainingCalcService } from './analysis-time-remaining-calc.service';

describe('AnalysisTimeRemainingCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalysisTimeRemainingCalcService]
    });
  });

  it('should be created', inject([AnalysisTimeRemainingCalcService], (service: AnalysisTimeRemainingCalcService) => {
    expect(service).toBeTruthy();
  }));
});
