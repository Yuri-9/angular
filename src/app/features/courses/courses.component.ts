import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { isSomeValuesTrue } from 'src/app/common/helper';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new ReplaySubject(1);
  name$ = this.userStateFacade.name$;

  isLoading$: Observable<boolean> = of(false);

  constructor(
    private authService: AuthService,
    private authStateFacade: AuthStateFacade,
    private userStateFacade: UserStateFacade,
    private coursesStateFacade: CoursesStateFacade,
    private authorStateFacade: AuthorsStateFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoadingState();
  }

  handleLogout(): void {
    this.authService.logout().pipe(takeUntil(this.destroy$)).subscribe();
    this.authStateFacade.logout();
    this.router.navigateByUrl('/login');
  }

  initLoadingState(): void {
    this.isLoading$ = combineLatest([
      this.coursesStateFacade.isCourseLoading$,
      this.coursesStateFacade.isCoursesLoading$,
      this.authorStateFacade.isLoading$,
    ]).pipe(map(loaderStates => isSomeValuesTrue(loaderStates)));
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
