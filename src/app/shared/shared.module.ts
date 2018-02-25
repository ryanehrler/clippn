import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { PoiTimelineComponent } from './components/poi-timeline/poi-timeline.component';
import { ClipFilterPipe } from './filter/clip-filter.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [ClipFilterPipe, PoiTimelineComponent],
  declarations: [ClipFilterPipe, PoiTimelineComponent]
})
export class SharedModule {}
