import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DragulaModule } from 'ng2-dragula';
import { MaterialModule } from '../material/material.module';
import { IntervalAnalysisComponent } from './components/interval-analysis/interval-analysis.component';
import { PoiChipComponent } from './components/poi-chip/poi-chip.component';
import { PoiTimelineComponent } from './components/poi-timeline/poi-timeline.component';
import { ClipFilterPipe } from './filter/clip-filter.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule, DragulaModule],
  exports: [
    ClipFilterPipe,
    PoiTimelineComponent,
    PoiChipComponent,
    IntervalAnalysisComponent
  ],
  declarations: [
    ClipFilterPipe,
    PoiTimelineComponent,
    PoiChipComponent,
    IntervalAnalysisComponent
  ]
})
export class SharedModule {}
