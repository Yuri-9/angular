import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { APP_ROUTS, User } from 'src/app/app-model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { InitialUserData } from './login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('formLogin') formLogin: any;

  hidePassword = true;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  userData: User = InitialUserData;

  @Output() navigateEvent = new EventEmitter<APP_ROUTS>();
  @Output() loginEvent = new EventEmitter<User>();

  login() {
    if (this.formLogin.form.status === 'VALID') {
      this.loginEvent.emit(this.userData);
      this.navigateEvent.emit(APP_ROUTS.COURSES);
    }
  }

  navigateToRegistration(event: Event) {
    event.preventDefault();
    this.navigateEvent.emit(APP_ROUTS.REGISTRATION);
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
