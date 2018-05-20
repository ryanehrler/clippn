import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragulaModule } from 'ng2-dragula';
import { MaterialModule } from '../material/material.module';
import { ConfirmationDialogComponent } from './components/context-menu/confirmation-dialog/confirmation-dialog.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { IntervalAnalysisComponent } from './components/interval-analysis/interval-analysis.component';
import { PoiChipComponent } from './components/poi-chip/poi-chip.component';
import { PoiTimelineComponent } from './components/poi-timeline/poi-timeline.component';
import { ClipFilterPipe } from './filter/clip-filter.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    DragulaModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ClipFilterPipe,
    PoiTimelineComponent,
    PoiChipComponent,
    IntervalAnalysisComponent,
    ContextMenuComponent
  ],
  declarations: [
    ClipFilterPipe,
    PoiTimelineComponent,
    PoiChipComponent,
    IntervalAnalysisComponent,
    ContextMenuComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
