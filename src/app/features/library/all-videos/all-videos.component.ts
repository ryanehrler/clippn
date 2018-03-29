import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../../core/services';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
  folder: string;
  constructor(private electronService: ElectronService) {}

  ngOnInit() {}

  openFolder() {
    this.folder = this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    })[0];

    this.electronService.fileSystem.readdir(this.folder, (err, items) => {
      console.log(items);
    });
  }
}
