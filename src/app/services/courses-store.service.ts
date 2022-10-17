import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Course } from '../features/courses/courses-model';

import { CoursesService, SearchQueriesCourse } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  readonly courses$: Observable<Course[]> = this.courses$$.asObservable();

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private _coursesService: CoursesService) {}

  getAll(): Observable<Course[]> {
    this.isLoading$.next(true);
    return this._coursesService.getAll().pipe(
      finalize(() => this.isLoading$.next(false)),
      tap(courses => this.courses$$.next(courses))
    );
  }

  createCourse(course: Course): Observable<any> {
    return this._coursesService.createCourse(course);
  }

  editCourse(course: Course): Observable<any> {
    return this._coursesService.editCourse(course);
  }

  filterCourse(queries: SearchQueriesCourse): Observable<any> {
    return this._coursesService.filterCourse(queries).pipe(
      tap(courses => {
        this.courses$$.next(courses);
      })
    );
  }

  deleteCourse(course: Course): Observable<any> {
    return this._coursesService.deleteCourse(course);
  }
}
