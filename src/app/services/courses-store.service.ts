import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, finalize, map, Observable, tap } from 'rxjs';
import { Author } from '../app-model';
import { Course } from '../features/courses/courses-model';
import { AuthorsService } from './authors.service';

import { CoursesService, SearchQueriesCourse } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  readonly courses$: Observable<Course[]> = this.courses$$.asObservable();

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private _coursesService: CoursesService, private _authorService: AuthorsService) {}

  getAll(): Observable<Course[]> {
    this.isLoading$.next(true);
    return combineLatest([this._coursesService.getAll(), this._authorService.getAll()]).pipe(
      map(([courses, authors]) => CoursesStoreService.replaceAuthorIdsToNamesInCourses(courses, authors)),
      finalize(() => this.isLoading$.next(false)),
      tap(courses => this.courses$$.next(courses))
    );
  }

  createCourse(course: Course): Observable<any> {
    this.isLoading$.next(true);
    return this._coursesService.createCourse(course);
  }

  editCourse(course: Course): Observable<any> {
    this.isLoading$.next(true);
    return this._coursesService.editCourse(course);
  }

  filterCourse(queries: SearchQueriesCourse): Observable<any> {
    this.isLoading$.next(true);
    return combineLatest([this._coursesService.filterCourse(queries), this._authorService.getAll()]).pipe(
      map(([courses, authors]) => CoursesStoreService.replaceAuthorIdsToNamesInCourses(courses, authors)),
      finalize(() => this.isLoading$.next(false)),
      tap(courses => {
        this.courses$$.next(courses);
      })
    );
  }

  deleteCourse(course: Course): Observable<any> {
    this.isLoading$.next(true);
    return this._coursesService.deleteCourse(course);
  }

  static replaceAuthorIdsToNamesInCourses(courses: Course[], authors: Author[]): Course[] {
    const mapAuthors = new Map(
      authors.map(({ id, name }) => {
        return [id, name];
      })
    );

    const coursesThisAuthorsNames = courses.map(course => {
      const authorsNameList = course.authors.map(id => mapAuthors.get(id) || '');
      return { ...course, authors: authorsNameList };
    });

    return coursesThisAuthorsNames;
  }
}
