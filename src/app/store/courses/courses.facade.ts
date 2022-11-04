import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesSelectors } from './courses.selectors';
import { CoursesActions } from './courses.actions';
import { Course } from 'src/app/features/courses/courses-model';

@Injectable()
export class CoursesStateFacade {
  isCoursesLoading$ = this.store.select(CoursesSelectors.selectIsCoursesLoading);
  isCourseLoading$ = this.store.select(CoursesSelectors.selectIsCourseLoading);
  courses$ = this.store.select(CoursesSelectors.selectAllCourses);

  constructor(private store: Store) {}

  getCourses(): void {
    this.store.dispatch(CoursesActions.requestGetCourses());
  }

  getCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestGetCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestGetFilteredCourses({ searchValue }));
  }

  createCourse(course: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  editCourse(course: Course): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course }));
  }

  deleteCourse(course: Course): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ course }));
  }
}
