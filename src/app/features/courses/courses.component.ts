import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/app-model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  user: User;
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _router: Router, private _coursesStoreService: CoursesStoreService) {
    this.user = this._authService.getUser();
  }

  handleLogout(): void {
    this._authService.logout();
    this._router.navigateByUrl('login');
  }

  ngOnInit(): void {
    this._coursesStoreService.isLoading$.subscribe(isLoading => {
      Promise.resolve().then(() => (this.isLoading = isLoading));
    });
  }
}
