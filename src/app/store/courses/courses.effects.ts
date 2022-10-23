import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Author } from 'src/app/app-model';
import { Course } from 'src/app/features/courses/courses-model';
import { AuthorsService } from 'src/app/services/authors.service';
import { CoursesService } from 'src/app/services/courses.service';
import { CoursesActions } from './courses.actions';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestGetCourses),
      mergeMap(() =>
        combineLatest([this.coursesService.getAll(), this.authorService.getAll()]).pipe(
          map(([courses, authors]) => {
            const CourseWithAuthorName = CoursesEffects.replaceAuthorIdsToNamesInCourses(courses, authors);
            return CoursesActions.requestGetCoursesSuccess({ courses: CourseWithAuthorName });
          }),
          catchError(() => of(CoursesActions.requestGetCoursesFail()))
        )
      )
    );
  });

  filteredCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestGetFilteredCourses),
      mergeMap(({ searchValue }) =>
        combineLatest([this.coursesService.filterCourse(searchValue), this.authorService.getAll()]).pipe(
          map(([courses, authors]) => {
            const CourseWithAuthorName = CoursesEffects.replaceAuthorIdsToNamesInCourses(courses, authors);
            return CoursesActions.requestGetFilteredCoursesSuccess({ courses: CourseWithAuthorName });
          }),
          catchError(() => of(CoursesActions.requestGetFilteredCoursesFail()))
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map(() => CoursesActions.requestCreateCourseSuccess()),

          catchError(() => of(CoursesActions.requestCreateCourseFail()))
        )
      )
    );
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({ course }) =>
        this.coursesService.editCourse(course).pipe(
          map(() => {
            return CoursesActions.requestEditCourseSuccess();
          }),

          catchError(() => of(CoursesActions.requestEditCourseFail()))
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({ course }) =>
        this.coursesService.deleteCourse(course).pipe(
          map(() => {
            this.courseStateFacade.getCourses();
            return CoursesActions.requestDeleteCourseSuccess();
          }),
          catchError(() => of(CoursesActions.requestDeleteCourseFail()))
        )
      )
    );
  });

  redirectToTheCoursesPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CoursesActions.requestEditCourseSuccess, CoursesActions.requestCreateCourseSuccess),
        tap(() => {
          this.router.navigateByUrl('/courses');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private authorService: AuthorsService,
    private courseStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

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
