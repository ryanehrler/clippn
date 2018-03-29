import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

import { AllVideosComponent } from './all-videos/all-videos.component';
import { ClipDetailModalComponent } from './clip-detail-modal/clip-detail-modal.component';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';

@NgModule({
  imports: [CommonModule, LibraryRoutingModule, MaterialModule, SharedModule],
  declarations: [
    LibraryComponent,
    ClipDetailModalComponent,
    AllVideosComponent
  ],
  entryComponents: [ClipDetailModalComponent]
})
export class LibraryModule {}
