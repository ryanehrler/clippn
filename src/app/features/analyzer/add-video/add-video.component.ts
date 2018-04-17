import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TdDialogService } from '@covalent/core';
import { Clip } from '../../../core/services/clip/clip';
import { ClipService } from '../../../core/services/clip/clip.service';
import {
  AnalyzerListItem,
  GameAnalyzerService
} from '../../../core/services/game-analyzer';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoUrlService } from '../../../core/services';
import { MatButtonToggleGroup, MatHorizontalStepper } from '@angular/material';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  disableUpload = false;
  clip: Clip;
  file: File;
  videoName: string;
  gameTitleList: AnalyzerListItem[];

  step1Form: FormGroup;
  step2Form: FormGroup;

  @ViewChild('gameTitle') gameTitle: MatButtonToggleGroup;
  @ViewChild('stepper') stepper: MatHorizontalStepper;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private videoUrlService: VideoUrlService,
    private clipService: ClipService,
    private gameAnalyzerService: GameAnalyzerService,
    private dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.step1Form = this.formBuilder.group({
      ctrl: [false, Validators.requiredTrue]
    });
    this.step2Form = this.formBuilder.group({
      ctrl: [false, Validators.requiredTrue]
    });

    this.clip = this.clipService.clip;
    if (this.clip != null) {
      this.toggleVarsOnFileSet();
      this.gameTitle.value = this.clip.gameTitle;
    }
    this.gameTitleList = this.gameAnalyzerService.analyzerList;

    this.activatedRoute.params.subscribe(params => {
      const videoName = params['videoName'];

      this.videoName = videoName;
    });
  }

  fileSelectEvent(file: File): void {
    this.videoUrlService.storeFile(file);
    this.file = file;
    this.setFormValue(this.step1Form, true);
    this.stepper.next();
  }

  gameTitleSelect() {
    this.setFormValue(this.step2Form, true);
  }

  analyze() {
    // The clip is already saved so navigate to analyzer.
    if (this.clip != null) {
      this.navigateToAnalyzer();
      return;
    }
    if (this.file != null) {
      this.submit(this.file.name, this.file.type);
    }
    if (this.videoName != '') {
      this.submit(this.videoName, '.mp4');
    }
  }

  submit(name: string, fileType: string) {
    this.clipService
      .initializeClip(name, fileType, this.gameTitle.value)
      .then(() => {
        this.clip = this.clipService.clip;
        this.videoName = name;
        this.navigateToAnalyzer();
      })
      .catch(err => {
        console.log('init-clip-failed', err);
      });
    this.toggleVarsOnFileSet();
  }

  toggleVarsOnFileSet() {
    this.disableUpload = true;
    this.setFormValue(this.step1Form, true);

    if (this.clip != null && this.clip.gameTitle != null) {
      this.gameTitle.value = this.clip.gameTitle;
      this.setFormValue(this.step2Form, true);
    }
  }

  private setFormValue(form: FormGroup, value: boolean) {
    form.setValue({ ctrl: true });
  }
  private navigateToAnalyzer() {
    this.router.navigate(['analyzer/analyze']);
  }
}
