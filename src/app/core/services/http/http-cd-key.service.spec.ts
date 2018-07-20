import { inject, TestBed } from '@angular/core/testing';

import { HttpCdKeyService } from './http-cd-key.service';

describe('CdKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCdKeyService]
    });
  });

  it('should be created', inject(
    [HttpCdKeyService],
    (service: HttpCdKeyService) => {
      expect(service).toBeTruthy();
    }
  ));
});
