import { Component, EventEmitter, Output } from '@angular/core';
import { APP_ROUTS } from 'src/app/app.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor() {}
  @Output() registrationEvent = new EventEmitter();

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.registrationEvent.emit(APP_ROUTS.LOGIN);
  }
}
