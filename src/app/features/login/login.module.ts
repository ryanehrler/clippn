import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [LoginPageComponent, LoginModalComponent],
  entryComponents: [LoginModalComponent]
})
export class LoginModule {}
