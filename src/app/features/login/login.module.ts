import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { PrimengModule } from '../../primeng/primeng.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginModule {}
