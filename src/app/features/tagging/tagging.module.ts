import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { TaggingRoutingModule } from './tagging-routing.module';
import { TaggingComponent } from './tagging/tagging.component';
import { ClipTimeNavigationService } from '../../core/services/clip';

@NgModule({
  imports: [
    CommonModule,
    TaggingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [TaggingComponent],
  providers: [ClipTimeNavigationService]
})
export class TaggingModule {}
