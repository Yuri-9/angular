import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { APP_ROUTS } from 'src/app/app.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buttonText = 'Login';
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  hidePassword = true;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;

  @Output() loginEvent = new EventEmitter();

  login() {
    this.emailControl.markAsDirty();
    this.passwordControl.markAsDirty();

    const hasErrors = this.emailControl.errors || this.passwordControl.errors;

    !hasErrors && this.loginEvent.emit(APP_ROUTS.COURSES);
  }

  navigateToRegistration(event: Event) {
    event.preventDefault();
    this.loginEvent.emit(APP_ROUTS.REGISTRATION);
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit(): void {
    this.emailControl.statusChanges.subscribe(value =>
      console.log('email', value)
    );

    this.passwordControl.valueChanges.subscribe(value =>
      console.log('password', this.passwordControl.errors)
    );
  }
}
