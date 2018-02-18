import { Component, OnInit } from '@angular/core';
import { ClipService } from '../../../core/services/clip/clip.service';
import { FileStorageService } from '../../../core/services/file-storage/file-storage.service';

@Component({
  selector: 'app-analyze-video',
  templateUrl: './analyze-video.component.html',
  styleUrls: ['./analyze-video.component.scss']
})
export class AnalyzeVideoComponent implements OnInit {
  videoFile: File;

  constructor(
    private clipService: ClipService,
    private fileStorageService: FileStorageService
  ) {}

  ngOnInit() {
    if (this.clipService.clip != null) {
      console.log('GET FILLE');
      this.videoFile = this.fileStorageService.getFile(
        this.clipService.clip.name
      );
    }
  }
}
