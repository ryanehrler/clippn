import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PoiTimelineComponent } from './components/poi-timeline/poi-timeline.component';
import { ClipFilterPipe } from './filter/clip-filter.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [ClipFilterPipe, PoiTimelineComponent],
  declarations: [ClipFilterPipe, PoiTimelineComponent]
})
export class SharedModule {}
