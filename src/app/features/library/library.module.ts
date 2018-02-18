import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';

@NgModule({
  imports: [CommonModule, LibraryRoutingModule, MaterialModule, SharedModule],
  declarations: [LibraryComponent]
})
export class LibraryModule {}
