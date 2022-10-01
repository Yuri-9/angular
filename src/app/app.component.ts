import { Component, ViewEncapsulation } from '@angular/core';
import { APP_ROUTS } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular';
  selectedRoute: APP_ROUTS = APP_ROUTS.LOGIN;
  APP_ROUTS = APP_ROUTS;

  handleRoute(route: APP_ROUTS) {
    this.selectedRoute = route;
  }
}
