import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClipFilterPipe } from './filter/clip-filter.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [ClipFilterPipe],
  declarations: [ClipFilterPipe]
})
export class SharedModule {}
