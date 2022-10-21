import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new ReplaySubject(1);
  name$ = this._userStateFacade.name$;
  isLoading: boolean = false;

  constructor(
    private authStateFacade: AuthStateFacade,
    private authService: AuthService,
    private router: Router,
    private _coursesStoreService: CoursesStoreService,
    private _userStateFacade: UserStateFacade
  ) {}

  handleLogout(): void {
    this.authService.logout().pipe(takeUntil(this.destroy$)).subscribe();
    this.authStateFacade.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this._coursesStoreService.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(isLoading => {
      Promise.resolve().then(() => (this.isLoading = isLoading));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
