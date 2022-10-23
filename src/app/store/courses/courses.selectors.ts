import { createFeatureSelector, createSelector } from '@ngrx/store';

import { coursesFeatureKey, CoursesState } from './courses.reducer';

export namespace CoursesSelectors {
  const selectCourses = createFeatureSelector<CoursesState>(coursesFeatureKey);

  export const selectAllCourses = createSelector(selectCourses, (state: CoursesState) => state.courses);
  export const selectCourse = createSelector(selectCourses, (state: CoursesState) => state.course);
  export const selectIsSearchingState = createSelector(selectCourses, (state: CoursesState) => state.isSearchState);
  export const selectIsCoursesLoading = createSelector(selectCourses, (state: CoursesState) => state.isCoursesLoading);
  export const selectIsCourseLoading = createSelector(selectCourses, (state: CoursesState) => state.isCourseLoading);
  export const selectErrorMessage = createSelector(selectCourses, (state: CoursesState) => state.errorMessage);
}
