import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TdLoadingService } from '@covalent/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpCdKeyService } from '../../../core/services/http';
import { IUser } from '../../../shared/models/user';

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
  validatingKey: boolean;
  errorMessages: string[];

  createAccountForm: FormGroup;

  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private httpCdKeyService: HttpCdKeyService,
    private loadingService: TdLoadingService,
    private formBuilder: FormBuilder
  ) {
    this.createAccountForm = this.formBuilder.group({
      key: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.user = {
      email: '',
      uid: ''
    };
  }

  validateKey() {
    const keyControl = this.createAccountForm.controls['key'];
    keyControl.disable();
    this.loadingService.register('validatingKey');
    this.httpCdKeyService.validateKey(keyControl.value).subscribe(
      res => {
        keyControl.enable();
        this.loadingService.resolve('validatingKey');
        if (res.key !== undefined) {
          this.keyIsValid = true;
          this.user.keyId = res.id;
        } else {
          this.setErrorMessage('Invalid Key.');
        }
      },
      err => {
        keyControl.enable();
        this.loadingService.resolve('validatingKey');
        this.setErrorMessage('Invalid Key.');
      }
    );
  }

  reValidateKey() {
    if (this.keyIsValid) {
      this.keyIsValid = false;
    }
  }

  registerUser() {
    const user = this.setUserFromForm();
    console.log(this.keyIsValid, this.user.keyId);
    if (!this.keyIsValid) {
      this.setErrorMessage('Please enter a valid key');
    } else if (user.password === user.passwordConfirm) {
      this.registeringUser = true;
      this.registerKeyAndCreateUser();
    } else {
      this.setErrorMessage('Passwords dont match.');
    }
  }

  private registerKeyAndCreateUser() {
    this.httpCdKeyService.registerKey(this.user.keyId).subscribe(
      res => {
        if (res) {
          this.registeringUser = false;
          this.createUser();
        } else {
          this.promptKeyError();
        }
      },
      err => {
        this.promptKeyError();
      }
    );
  }

  private createUser() {
    this.auth.createUser(this.user).subscribe(
      res => {
        console.log('----RegisterUser.CreateUser then-----');
        console.log(res);
        this.dialog.closeAll();
      },
      err => {
        console.log('----ERROR REGISTERING USER-----');
      }
    );
  }
  private setUserFromForm(): IUser {
    const ctrls = this.createAccountForm.controls;

    this.user.username = ctrls['email'].value;
    this.user.email = ctrls['email'].value;
    this.user.passwordConfirm = ctrls['confirmPassword'].value;
    this.user.password = ctrls['password'].value;

    return this.user;
  }
  private setErrorMessage(message: string) {
    // this.snackBar.open(message, '', {
    //   duration: 2000,
    //   panelClass: 'custom-class'
    // });
    this.errorMessages = [message];
  }
  private promptKeyError() {
    this.setErrorMessage(
      'Maybe our bad? We failed to register your key. Please double check your key.  If you still have issues please email us @ support@clippn.com.'
    );
  }
}
