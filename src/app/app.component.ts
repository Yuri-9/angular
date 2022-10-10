import { Component, ViewEncapsulation } from '@angular/core';
import { APP_ROUTS, User } from './app-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular';
  selectedRoute: APP_ROUTS = APP_ROUTS.COURSES;
  APP_ROUTS = APP_ROUTS;
  user: User = {
    name: '',
    email: '',
    password: '',
  };

  handleRoute(route: APP_ROUTS) {
    this.selectedRoute = route;
  }

  handleRegistration(event: Event) {
    console.log('event', event);
  }

  handleLogin(user: User) {
    this.user = user;
  }
}
