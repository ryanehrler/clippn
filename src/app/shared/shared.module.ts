import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { PoiChipComponent } from './components/poi-chip/poi-chip.component';
import { PoiTimelineComponent } from './components/poi-timeline/poi-timeline.component';
import { ClipFilterPipe } from './filter/clip-filter.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [ClipFilterPipe, PoiTimelineComponent, PoiChipComponent],
  declarations: [ClipFilterPipe, PoiTimelineComponent, PoiChipComponent]
})
export class SharedModule {}
