import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { APP_ROUTS, User } from 'src/app/app.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'prettier';

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
  //for development
  user: User = {
    name: 'Petya',
    email: 'Petya@gmai.sdf',
    password: 'adsdfasf',
  };

  @Output() navigateEvent = new EventEmitter<APP_ROUTS>();
  @Output() loginEvent = new EventEmitter<User>();

  login() {
    this.emailControl.markAsDirty();
    this.passwordControl.markAsDirty();

    const hasErrors = this.emailControl.errors || this.passwordControl.errors;
    if (hasErrors) {
      return;
    }

    this.loginEvent.emit(this.user);
    this.navigateEvent.emit(APP_ROUTS.COURSES);
  }

  navigateToRegistration(event: Event) {
    event.preventDefault();
    this.navigateEvent.emit(APP_ROUTS.REGISTRATION);
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit(): void {
    //for development
    this.emailControl.setValue(this.user.email);
    this.passwordControl.setValue(this.user.password);

    this.emailControl.valueChanges.subscribe(value => {
      this.user.email = value !== null ? value : '';
    });

    this.passwordControl.valueChanges.subscribe(value => {
      this.user.password = value !== null ? value : '';
    });
  }
}
