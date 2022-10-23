import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ALERT_TEXT, User } from 'src/app/app-model';

import { HelperInputPassword } from '../helper/HelperInputPassword';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IModal } from 'src/app/shared/components';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends HelperInputPassword implements OnInit, OnDestroy {
  @ViewChild('formLogin') formLogin: any;
  private readonly destroy$ = new ReplaySubject(1);

  userData: User = {};
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;
  optionModalInfo: IModal = {
    title: 'Info',
    message: 'Successful!!',
    okButtonText: 'Ok',
  };
  isOpenModal = false;
  redirectUrl = 'login';

  constructor(private _authService: AuthService, private _router: Router) {
    super();
  }

  login(): void {
    if (this.formLogin.form.status === 'VALID') {
      this._authService.login(this.userData).pipe(takeUntil(this.destroy$)).subscribe();
      this.openModal();
    }
  }

  navigateToRegistration(event: Event): void {
    event.preventDefault();
    this._router.navigateByUrl('/registration');
  }

  confirmButtonModal(): void {
    this._router.navigateByUrl(this.redirectUrl);
    this.closeModal();
  }

  openModal(): void {
    this.isOpenModal = true;
  }

  closeModal(): void {
    this.isOpenModal = false;
  }

  initModalState(): void {
    this._authService.isAuthorized$.pipe(takeUntil(this.destroy$)).subscribe(isAuthorized => {
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

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
