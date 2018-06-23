import { TestBed, inject } from '@angular/core/testing';

import { AppDataFolderInitService } from './app-data-folder-init.service';

describe('AppDataFolderInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDataFolderInitService]
    });
  });

  it('should be created', inject([AppDataFolderInitService], (service: AppDataFolderInitService) => {
    expect(service).toBeTruthy();
  }));
});
