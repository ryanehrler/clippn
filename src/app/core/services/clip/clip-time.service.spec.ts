import { TestBed, inject } from '@angular/core/testing';

import { ClipTimeService } from './clip-time.service';

describe('ClipTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipTimeService]
    });
  });

  it('should be created', inject([ClipTimeService], (service: ClipTimeService) => {
    expect(service).toBeTruthy();
  }));
});
