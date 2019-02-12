import { TestBed, inject } from '@angular/core/testing';

import { KeyPressEventService } from './key-press-event.service';

describe('KeyPressEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyPressEventService]
    });
  });

  it('should be created', inject([KeyPressEventService], (service: KeyPressEventService) => {
    expect(service).toBeTruthy();
  }));
});
