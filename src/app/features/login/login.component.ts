import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { APP_ROUTS } from 'src/app/app.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buttonText = 'Login';
  emailControl = new FormControl();

  @Output() loginEvent = new EventEmitter();

  login() {
    this.loginEvent.emit(APP_ROUTS.COURSES);
  }

  ngOnInit(): void {
    this.emailControl.valueChanges.subscribe(value =>
      console.log('email', value)
    );
  }
}
