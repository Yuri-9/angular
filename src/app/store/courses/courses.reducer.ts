import { Action, createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/features/courses/courses-model';

import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  course: Course | null;
  isCoursesLoading: boolean;
  isCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  courses: [],
  course: null,
  isCoursesLoading: false,
  isCourseLoading: false,
  isSearchState: false,
  errorMessage: '',
};

const reducer = createReducer(
  initialState,
  on(CoursesActions.requestGetCourses, (state): CoursesState => ({ ...state, isCoursesLoading: true })),
  on(
    CoursesActions.requestGetCoursesSuccess,
    (state, { courses }): CoursesState => ({ ...state, courses: courses, isCoursesLoading: false })
  ),
  on(CoursesActions.requestGetCoursesFail, (state): CoursesState => ({ ...state, isCoursesLoading: false })),

  on(CoursesActions.requestGetFilteredCourses, (state): CoursesState => ({ ...state, isCoursesLoading: true })),
  on(
    CoursesActions.requestGetFilteredCoursesSuccess,
    (state, { courses }): CoursesState => ({ ...state, courses: courses, isCoursesLoading: false })
  ),
  on(CoursesActions.requestGetFilteredCoursesFail, (state): CoursesState => ({ ...state, isCoursesLoading: false })),

  on(CoursesActions.requestCreateCourse, (state): CoursesState => ({ ...state, isCourseLoading: true })),
  on(CoursesActions.requestCreateCourseSuccess, (state): CoursesState => ({ ...state, isCourseLoading: false })),
  on(CoursesActions.requestCreateCourseFail, (state): CoursesState => ({ ...state, isCourseLoading: false })),

  on(CoursesActions.requestEditCourse, (state): CoursesState => ({ ...state, isCourseLoading: true })),
  on(CoursesActions.requestEditCourseSuccess, (state): CoursesState => ({ ...state, isCourseLoading: false })),
  on(CoursesActions.requestEditCourseFail, (state): CoursesState => ({ ...state, isCourseLoading: false })),

  on(CoursesActions.requestDeleteCourse, (state): CoursesState => ({ ...state, isCourseLoading: true })),
  on(CoursesActions.requestDeleteCourseSuccess, (state): CoursesState => ({ ...state, isCourseLoading: false })),
  on(CoursesActions.requestDeleteCourseFail, (state): CoursesState => ({ ...state, isCourseLoading: false }))
);

export const coursesReducer = (state: CoursesState | undefined, action: Action): CoursesState => reducer(state, action);
