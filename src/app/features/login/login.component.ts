import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { ALERT_TEXT, APP_ROUTS, User } from 'src/app/app-model';

import { InitialUserData } from './login-model';
import { HelperInputPassword } from '../helper/HelperInputPassword';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IModal } from 'src/app/shared/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends HelperInputPassword implements OnInit {
  @ViewChild('formLogin') formLogin: any;

  userData: User = InitialUserData;
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;
  optionModalInfo: IModal = {
    title: 'Info',
    message: '',
    okButtonText: 'Ok',
  };
  isOpenModal = false;
  redirectUrl = 'login';

  constructor(private _authService: AuthService, private _router: Router) {
    super();
  }

  @Output() navigateEvent = new EventEmitter<APP_ROUTS>();
  @Output() loginEvent = new EventEmitter<User>();

  login(): void {
    if (this.formLogin.form.status === 'VALID') {
      this._authService.login(this.userData);
      this.openModal();
    }
  }

  navigateToRegistration(event: Event): void {
    event.preventDefault();
    this._router.navigateByUrl('/registration');
  }

  confirmButtonModal(): void {
    if (this._authService.isRegistered) {
      this._router.navigateByUrl(this.redirectUrl);
    }
    this.closeModal();
  }

  openModal(): void {
    this.isOpenModal = true;
  }

  closeModal(): void {
    this.isOpenModal = false;
  }

  initModalState(): void {
    this._authService.isAuthorized$.subscribe(isAuthorized => {
      if (isAuthorized) {
        this.optionModalInfo.message = 'Successful!!';
        this.redirectUrl = 'courses';
      } else {
        this.optionModalInfo.message = 'The email or password is incorrect';
        this.redirectUrl = 'login';
      }
    });
  }

  ngOnInit(): void {
    this.initModalState();
    this.userData = this._authService.getUser();
  }
}
