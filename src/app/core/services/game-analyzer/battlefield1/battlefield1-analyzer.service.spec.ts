import { inject, TestBed } from '@angular/core/testing';

import { Battlefield1AnalyzerService } from './battlefield1-analyzer.service';

describe('Battlefield1AnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Battlefield1AnalyzerService]
    });
  });

  it('should be created', inject([Battlefield1AnalyzerService], (service: Battlefield1AnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
