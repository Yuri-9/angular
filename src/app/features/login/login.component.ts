import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { APP_ROUTS, User } from 'src/app/app-model';
import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { InitialUserData } from './login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('formLogin') formLogin: any;

  isPasswordHide: boolean = true;
  passwordIcon: IconDefinition = faEye;
  passwordTextType: string = '';

  userData: User = InitialUserData;

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

  onPasswordIconClick(): void {
    this.isPasswordHide = !this.isPasswordHide;

    this.passwordIcon = this.isPasswordHide ? faEye : faEyeSlash;
    this.passwordTextType = this.isPasswordHide ? 'password' : 'text';
  }
}
