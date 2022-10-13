import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ALERT_TEXT, APP_ROUTS } from 'src/app/app-model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperInputPassword } from '../helper/HelperInputPassword';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends HelperInputPassword {
  nameAlertText: string = `Name ${ALERT_TEXT.MORE_THEN_6_CHARACTERS}`;
  passwordAlertText: string = `Password ${ALERT_TEXT.MORE_THEN_8_CHARACTERS}`;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService) {
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
      const { name, email, password } = this.form.value;
      // this.authService.register();
      console.log(name, email, password);

      // this.navigateEvent.emit(APP_ROUTS.LOGIN);
      this.registrationEvent.emit(this.form.value);
    }
  }

  // navigateToLogin(event: Event) {
  //   event.preventDefault();
  //   this._router.navigateByUrl('/login');
  // }
}
