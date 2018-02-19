import { Component, OnInit } from '@angular/core';

import { Clip } from '../../../core/services/clip/clip';
import { ClipService } from '../../../core/services/clip/clip.service';
import { FileStorageService } from '../../../core/services/file-storage/file-storage.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  disabled = false;
  clip: Clip;

  constructor(
    private fileStorageService: FileStorageService,
    private clipService: ClipService
  ) {}

  ngOnInit() {
    this.clip = this.clipService.clip;
    if (this.clip != null) {
      this.toggleVarsOnFileSet();
    }
  }

  selectEvent(file: File): void {
    this.fileStorageService.addFile(file);
    this.clipService
      .initializeClip(file.name, file.type, 'battlefield1')
      .then(() => {
        this.clip = this.clipService.clip;
      })
      .catch(err => {
        console.log('init-clip-failed', err);
      });
    this.toggleVarsOnFileSet();
  }

  toggleVarsOnFileSet() {
    this.disabled = true;
  }
}
