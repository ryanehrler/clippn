import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { TdDialogService } from '@covalent/core';
import { Clip } from '../../../core/services/clip/clip';
import { ClipService } from '../../../core/services/clip/clip.service';
import {
  AnalyzerListItem,
  GameAnalyzerService
} from '../../../core/services/game-analyzer';
import { ActivatedRoute } from '@angular/router';
import { VideoUrlService } from '../../../core/services';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  disabled = true;
  clip: Clip;
  file: File;
  gameTitle = '';
  videoName: string;
  gameTitleList: AnalyzerListItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoUrlService: VideoUrlService,
    private clipService: ClipService,
    private gameAnalyzerService: GameAnalyzerService,
    private dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.clip = this.clipService.clip;
    if (this.clip != null) {
      this.toggleVarsOnFileSet();
      this.gameTitle = this.clip.gameTitle;
    }
    this.gameTitleList = this.gameAnalyzerService.analyzerList;

    this.activatedRoute.params.subscribe(params => {
      const videoName = params['videoName'];

      this.videoName = videoName;
    });
  }

  selectEvent(file: File): void {
    this.videoUrlService.storeFile(file);
    this.file = file;
    console.log('selected-file: ', this.file);
    if (this.gameTitle !== '' && this.gameTitle != null) {
      this.submit(this.file.name, this.file.type);
    }
  }

  gameTitleSelect() {
    this.disabled = false;
    if (this.file != null) {
      this.submit(this.file.name, this.file.type);
    }
    if (this.videoName != '') {
      this.submit(this.videoName, '.mp4');
    }
  }

  submit(name: string, fileType: string) {
    this.clipService
      .initializeClip(name, fileType, this.gameTitle)
      .then(() => {
        this.clip = this.clipService.clip;
        this.videoName = name;
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
