import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBar } from '@angular/material';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/models/user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  user = {} as IUser;
  constructor(public auth: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  registerUser(user: IUser) {
    if (user.password === user.passwordConfirm) {
      this.auth.createUser(user);
    } else {
      // tell them the password doesn't match
      this.openSnackbar('password dont match bitch');
    }
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Shiiiiiiiit', {
      duration: 50000,
      panelClass: 'custom-class'
    });
  }
}
