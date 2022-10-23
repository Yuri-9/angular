import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new ReplaySubject(1);
  name: string = '';
  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _coursesStoreService: CoursesStoreService,
    private _userStoreService: UserStoreService
  ) {}

  handleLogout(): void {
    this._authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._router.navigateByUrl('login'));
  }

  ngOnInit(): void {
    this._coursesStoreService.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(isLoading => {
      Promise.resolve().then(() => (this.isLoading = isLoading));
    });

    this._userStoreService.name$.pipe(takeUntil(this.destroy$)).subscribe(name => (this.name = name || ''));
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
