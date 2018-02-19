import { Component, Injector, OnInit } from '@angular/core';

import { Clip } from '../../../core/services/clip/clip';
import { ClipService } from '../../../core/services/clip/clip.service';
import { FileStorageService } from '../../../core/services/file-storage/file-storage.service';
import { GameAnalyzerService } from '../../../core/services/game-analyzer/game-analyzer.service';
import { IGameAnalyzer } from '../../../core/services/game-analyzer/IGameAnalyzer';

@Component({
  selector: 'app-analyze-video',
  templateUrl: './analyze-video.component.html',
  styleUrls: ['./analyze-video.component.scss']
})
export class AnalyzeVideoComponent implements OnInit {
  videoFile: File;
  gameAnalyzer: IGameAnalyzer; // set in ngOnInit and injected in analyzer.component.ts
  clip: Clip;

  webGl: any;

  constructor(
    private clipService: ClipService,
    private fileStorageService: FileStorageService,
    private injector: Injector,
    private gameAnalyzerService: GameAnalyzerService
  ) {}

  ngOnInit() {
    this.clip = this.clipService.clip;
    if (this.clip != null) {
      console.log('GET FILLE');
      this.videoFile = this.fileStorageService.getFile(
        this.clipService.clip.name
      );

      this.gameAnalyzer = this.injector.get(
        this.gameAnalyzerService.analyzerMap[this.clip.gameTitle]
      );

      this.gameAnalyzer.processVideo(this.webGl);
    }
  }
}
