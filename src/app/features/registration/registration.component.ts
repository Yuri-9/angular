import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { APP_ROUTS } from 'src/app/app-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  isPasswordHide: boolean = true;
  passwordIcon: IconDefinition = faEye;
  passwordTextType: string = '';
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

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
      this.navigateEvent.emit(APP_ROUTS.LOGIN);
      this.registrationEvent.emit(this.form.value);
    }
  }

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.navigateEvent.emit(APP_ROUTS.LOGIN);
  }

  onPasswordIconClick(): void {
    this.isPasswordHide = !this.isPasswordHide;

    this.passwordIcon = this.isPasswordHide ? faEye : faEyeSlash;
    this.passwordTextType = this.isPasswordHide ? 'password' : 'text';
  }
}
