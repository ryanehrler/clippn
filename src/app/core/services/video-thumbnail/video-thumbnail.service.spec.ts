import { TestBed, inject } from '@angular/core/testing';

import { VideoThumbnailService } from './video-thumbnail.service';

describe('VideoThumbnailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoThumbnailService]
    });
  });

  it('should be created', inject([VideoThumbnailService], (service: VideoThumbnailService) => {
    expect(service).toBeTruthy();
  }));
});
