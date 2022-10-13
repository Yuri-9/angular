import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { ALERT_TEXT, APP_ROUTS, User } from 'src/app/app-model';

import { InitialUserData } from './login-model';
import { HelperInputPassword } from '../helper/HelperInputPassword';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends HelperInputPassword {
  @ViewChild('formLogin') formLogin: any;

  userData: User = InitialUserData;
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;

  constructor(private _authService: AuthService, private _router: Router) {
    super();
  }

  @Output() navigateEvent = new EventEmitter<APP_ROUTS>();
  @Output() loginEvent = new EventEmitter<User>();

  login(): void {
    if (this.formLogin.form.status === 'VALID') {
      this._authService.login(this.userData);
    }
  }

  navigateToRegistration(event: Event): void {
    event.preventDefault();
    this._router.navigateByUrl('/registration');
  }
}
