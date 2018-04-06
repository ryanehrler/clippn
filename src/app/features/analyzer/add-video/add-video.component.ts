import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { TdDialogService } from '@covalent/core';
import { Clip } from '../../../core/services/clip/clip';
import { ClipService } from '../../../core/services/clip/clip.service';
import { FileStorageService } from '../../../core/services/file-storage/file-storage.service';
import {
  AnalyzerListItem,
  GameAnalyzerService
} from '../../../core/services/game-analyzer';

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
  gameName = '';
  gameTitleList: AnalyzerListItem[];

  constructor(
    private fileStorageService: FileStorageService,
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
  }

  selectEvent(file: File): void {
    this.fileStorageService.addFile(file);
    this.file = file;
    if (this.gameTitle !== '' && this.gameTitle != null) {
      this.submit();
    }
  }
  gameTitleSelect() {
    this.disabled = false;
    if (this.file != null) {
      this.submit();
    }
  }
  submit() {
    this.clipService
      .initializeClip(this.file.name, this.file.type, this.gameTitle)
      .then(() => {
        this.clip = this.clipService.clip;
        this.gameName = this.file.name;
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
