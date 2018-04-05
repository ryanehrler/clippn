import { inject, TestBed } from '@angular/core/testing';

import { LocalVideoService } from './local-video.service';

describe('LocalVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalVideoService]
    });
  });

  it(
    'should be created',
    inject([LocalVideoService], (service: LocalVideoService) => {
      expect(service).toBeTruthy();
    })
  );
});
