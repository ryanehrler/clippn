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
  registeringUser: boolean;

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
    this.httpCdKeyService.validateKey(this.key).subscribe(res => {
      console.log(res);

      if (res.key !== undefined) {
        this.keyIsValid = true;
        this.user.keyId = res.id;
      }
    });
  }
  reValidateKey() {
    if (this.keyIsValid) {
      this.keyIsValid = false;
    }
  }
  registerUser(user: IUser) {
    if (this.keyIsValid) {
      this.openSnackbar('Please enter a valid key');
    } else if (user.password === user.passwordConfirm) {
      this.registeringUser = true;
      this.httpCdKeyService.registerKey(this.user.keyId).subscribe(res => {
        if (res) {
          this.registeringUser = false;
          this.auth.createUser(user);
        } else {
          this.openSnackbar('Sorry but we failed to register key. Please check you have entered a proper key.  If you have then email us @ support@clippn.com.');
        }
      });
    } else {
      // tell them the password doesn't match
      this.openSnackbar('Passwords dont match.');
    }
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: 'custom-class'
    });
  }
}
