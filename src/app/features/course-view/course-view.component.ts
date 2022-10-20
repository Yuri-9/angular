import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject, takeUntil } from 'rxjs';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Course } from '../courses/courses-model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
})
export class CourseViewComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new ReplaySubject(1);
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;
  canEdit = true;
  isAdmin = false;
  course: Course;

  constructor(private _router: Router, private _userStoreService: UserStoreService) {
    const course = this._router.getCurrentNavigation()?.extras.state as Course;

    this.course = course;
  }

  editCourse(course: Course): void {
    this._router.navigateByUrl(`/courses/edit/${course.id}`, { state: course });
  }

  navigateToCourses(): void {
    this._router.navigateByUrl(`/courses`);
  }
  ngOnInit(): void {
    this._userStoreService.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe(isAdmin => (this.isAdmin = !!isAdmin));
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
