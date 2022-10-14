import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ALERT_TEXT, APP_ROUTS } from 'src/app/app-model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IModal } from 'src/app/shared/components';
import { HelperInputPassword } from '../helper/HelperInputPassword';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends HelperInputPassword {
  nameAlertText: string = `Name ${ALERT_TEXT.MORE_THEN_3_CHARACTERS}`;
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;
  form: FormGroup = new FormGroup({
    name: new FormControl('YRA'),
    email: new FormControl('123@qq.qq'),
    password: new FormControl('1123123123'),
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

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    } else {
      this._authService.register(this.form.value).subscribe(isRegistered => {
        if (isRegistered) {
          this.optionModalInfo.message = 'Registration successful!';
        } else {
          this.optionModalInfo.message = 'A user with this email already exists. Please login or use a different email';
        }
        this.openModal();
      });
    }
  }

  confirmButtonModal(): void {
    if (this._authService.isRegistered) {
      this._router.navigateByUrl('/login');
    }
    this.closeModal();
  }

  openModal(): void {
    this.isOpenModal = true;
  }

  closeModal() {
    this.isOpenModal = false;
  }
}
