import { inject, TestBed } from '@angular/core/testing';

import { ClipService } from './clip.service';

describe('ClipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipService]
    });
  });

  it('should ...', inject([ClipService], (service: ClipService) => {
    expect(service).toBeTruthy();
  }));
});
