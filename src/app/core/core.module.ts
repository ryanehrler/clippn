import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { TdDialogService } from '@covalent/core';
import { MaterialModule } from '../material/material.module';
import { ErrorComponent } from './components/error/error.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NodejsUtilityService } from './services';
import { AnalysisTimeRemainingCalcService } from './services/analysis-time-remaining-calc.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { ClipAnalyzerService } from './services/clip/clip-analyzer.service';
import { ClipService } from './services/clip/clip.service';
import { ElectronService } from './services/electron/electron.service';
import { FrameExtractorService } from './services/electron/frame-extractor.service';
import { NodejsService } from './services/electron/nodejs.service';
import { FileStorageService } from './services/file-storage/file-storage.service';
import { FirestoreService } from './services/firestore/firestore.service';
import { GoogleAnalyticsService } from './services/google-analytics/index';
import { LocalVideoService } from './services/video-library/local-video.service';
import { VideoThumbnailService } from './services/video-thumbnail/video-thumbnail.service';
import { VideoUrlService } from './services/video-url/video-url.service';
import { AppDataFolderInitService } from './services/app-data-folder-init/app-data-folder-init.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  declarations: [SideNavComponent, ErrorComponent],
  exports: [SideNavComponent],
  providers: [
    FirestoreService,
    AuthService,
    AuthGuard,
    GoogleAnalyticsService,
    ClipService,
    ClipAnalyzerService,
    FileStorageService,
    AnalysisTimeRemainingCalcService,
    ElectronService,
    NodejsService,
    NodejsUtilityService,
    LocalVideoService,
    VideoUrlService,
    FrameExtractorService,
    VideoThumbnailService,
    AppDataFolderInitService
  ]
})
export class CoreModule {
  forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
