import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';

import { ALERT_TEXT } from 'src/app/app-model';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { IModal } from 'src/app/shared/components';
import { HelperInputPassword } from '../helper/HelperInputPassword';
import { InitialUser } from './registration-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends HelperInputPassword implements OnDestroy {
  private readonly destroy$ = new ReplaySubject(1);
  nameAlertText: string = `Name ${ALERT_TEXT.MORE_THEN_3_CHARACTERS}`;
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;
  isRegistered = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(InitialUser.name),
    email: new FormControl(InitialUser.email),
    password: new FormControl(InitialUser.password),
  });

  optionModalInfo: IModal = {
    title: 'Info',
    message: '',
    okButtonText: 'Ok',
  };
  isOpenModal = false;

  constructor(private authStateFacade: AuthStateFacade, private router: Router) {
    super();
    this.authStateFacade.isRegistered$.pipe(takeUntil(this.destroy$)).subscribe(isRegistered => (this.isRegistered = isRegistered));
  }

  get name(): any {
    return this.form.get('name');
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    } else {
      this.authStateFacade.register(this.form.value);
      this.authStateFacade.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(isLoading => {
        if (!isLoading) {
          this.openModal();
        }
      });
    }
  }

  openModal(): void {
    this.optionModalInfo.message = this.isRegistered
      ? 'Registration successful!'
      : 'A user with this email already exists. Please login or use a different email';
    this.isOpenModal = true;
  }

  closeModal(): void {
    this.isOpenModal = false;
  }

  confirmButtonModal(): void {
    if (this.isRegistered) {
      this.router.navigateByUrl('/login');
    }
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
