import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  name: string = '';
  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _coursesStoreService: CoursesStoreService,
    private _userStoreService: UserStoreService
  ) {}

  handleLogout(): void {
    this._authService.logout();
    this._router.navigateByUrl('login');
  }

  ngOnInit(): void {
    this._coursesStoreService.isLoading$.subscribe(isLoading => {
      Promise.resolve().then(() => (this.isLoading = isLoading));
    });

    this._userStoreService.name$.subscribe(name => (this.name = name || ''));
  }
}
