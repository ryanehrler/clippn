import { inject, TestBed } from '@angular/core/testing';

import { FortniteAnalyzerService } from './fortnite-analyzer.service';

describe('FortniteAnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FortniteAnalyzerService]
    });
  });

  it('should be created', inject([FortniteAnalyzerService], (service: FortniteAnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
