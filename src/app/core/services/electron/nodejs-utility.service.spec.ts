import { TestBed, inject } from '@angular/core/testing';

import { NodejsUtilityService } from './nodejs-utility.service';

describe('NodejsUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodejsUtilityService]
    });
  });

  it('should be created', inject([NodejsUtilityService], (service: NodejsUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
