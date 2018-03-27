import { TestBed, inject } from '@angular/core/testing';

import { ClipTimeNavigationService } from './clip-time-navigation.service';

describe('ClipTimeNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipTimeNavigationService]
    });
  });

  it('should be created', inject([ClipTimeNavigationService], (service: ClipTimeNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
