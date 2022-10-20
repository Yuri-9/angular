import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, ReplaySubject, takeUntil } from 'rxjs';

import { ALERT_TEXT } from 'src/app/app-model';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  constructor(private _authService: AuthService, private _router: Router) {
    super();
  }

  @Output() navigateEvent = new EventEmitter();
  @Output() registrationEvent = new EventEmitter();

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
      this._authService
        .register(this.form.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.openModal())
        )
        .subscribe({
          next: () => {
            this.isRegistered = true;
            this.optionModalInfo.message = 'Registration successful!';
          },
          error: () => {
            this.isRegistered = false;
            this.optionModalInfo.message = 'A user with this email already exists. Please login or use a different email';
          },
        });
    }
  }

  confirmButtonModal(): void {
    if (this.isRegistered) {
      this._router.navigateByUrl('/login');
    }
    this.closeModal();
  }

  openModal(): void {
    this.isOpenModal = true;
  }

  closeModal(): void {
    this.isOpenModal = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
