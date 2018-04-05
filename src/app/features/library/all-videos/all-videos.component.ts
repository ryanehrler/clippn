import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { LocalVideo, LocalVideoService } from '../../../core/services';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
  folder: string;
  constructor(private localVideoService: LocalVideoService) {}

  localVideos: LocalVideo[];

  ngOnInit() {
    this.openFolder();
  }

  openFolder() {
    this.localVideoService.getLocalVideos().subscribe((videos: LocalVideo[]) => {
      this.localVideos = videos;
    });
  }
}
