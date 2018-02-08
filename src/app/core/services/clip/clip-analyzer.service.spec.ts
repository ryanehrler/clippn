import { TestBed, inject } from '@angular/core/testing';

import { ClipAnalyzerService } from './clip-analyzer.service';

describe('ClipAnalyzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipAnalyzerService]
    });
  });

  it('should ...', inject([ClipAnalyzerService], (service: ClipAnalyzerService) => {
    expect(service).toBeTruthy();
  }));
});
