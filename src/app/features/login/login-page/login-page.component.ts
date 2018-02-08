import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../shared/models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user = {} as IUser;

  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
