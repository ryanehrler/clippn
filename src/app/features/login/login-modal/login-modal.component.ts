import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/models/user';
import { HttpCdKeyService } from '../../../core/services/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  user: IUser;
  key: string;
  keyIsValid: boolean;

  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar,
    private httpCdKeyService: HttpCdKeyService
  ) {}

  ngOnInit() {
    this.user = {
      email: '',
      uid: ''
    };
  }

  validateKey() {
    console.log(this.key);

    // this.httpCdKeyService.validateKey(this.key).then(res => {
    //   console.log(res);
    // });

    this.httpCdKeyService.validateKey(this.key).subscribe(res => {
      console.log(res);

      if (res.key !== undefined) {
        this.keyIsValid = true;
      }
    });
  }
  reValidateKey() {
    if (this.keyIsValid) {
      this.keyIsValid = false;
    }
  }
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
