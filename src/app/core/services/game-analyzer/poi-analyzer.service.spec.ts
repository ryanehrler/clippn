import { TestBed, inject } from '@angular/core/testing';

import { PoiAnalyzerService } from './poi-analyzer.service';

describe('PoiAnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoiAnalyzerService]
    });
  });

  it('should be created', inject([PoiAnalyzerService], (service: PoiAnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
