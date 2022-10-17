import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/app-model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  user: User;

  constructor(private _authService: AuthService, private _router: Router) {
    this.user = this._authService.getUser();
  }

  handleLogout(): void {
    this._authService.logout();
    this._router.navigateByUrl('login');
  }
}
