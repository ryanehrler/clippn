import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameAnalyzerService } from '../../core/services/game-analyzer/game-analyzer.service';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AddVideoComponent } from './add-video/add-video.component';
import { AnalyzeVideoComponent } from './analyze-video/analyze-video.component';
import { AnalyzerRoutingModule } from './analyzer-routing.module';
import { AnalyzerComponent } from './analyzer/analyzer.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AnalyzerRoutingModule, SharedModule],
  declarations: [AddVideoComponent, AnalyzerComponent, AnalyzeVideoComponent],
  providers: [GameAnalyzerService]
})
export class AnalyzerModule {}
