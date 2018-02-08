/*
 *  This module is responsible for Prime-Ng imports
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    PanelModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    PanelModule
  ],
  declarations: []
})
export class PrimengModule {}
