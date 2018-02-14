import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  fileSelectMsg = 'No file selected yet.';
  fileUploadMsg = 'No file uploaded yet.';
  disabled = false;
  videoFile: File;

  constructor() {}

  ngOnInit() {}

  selectEvent(file: File): void {
    this.videoFile = file;
    this.disabled = true;
  }
}
