import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/models/user';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user = {} as IUser;

  constructor(public auth: AuthService, public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '600px'
    });
  }
}
