import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { ALERT_TEXT, APP_ROUTS, User } from 'src/app/app-model';

import { InitialUserData } from './login-model';
import { HelperInputPassword } from '../helper/HelperInputPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends HelperInputPassword {
  @ViewChild('formLogin') formLogin: any;

  userData: User = InitialUserData;
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;

  @Output() navigateEvent = new EventEmitter<APP_ROUTS>();
  @Output() loginEvent = new EventEmitter<User>();

  login(): void {
    if (this.formLogin.form.status === 'VALID') {
      this.loginEvent.emit(this.userData);
      this.navigateEvent.emit(APP_ROUTS.COURSES);
    }
  }

  navigateToRegistration(event: Event): void {
    event.preventDefault();
    this.navigateEvent.emit(APP_ROUTS.REGISTRATION);
  }
}
