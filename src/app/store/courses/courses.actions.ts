import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/features/courses/courses-model';

export namespace CoursesActions {
  //all
  export const requestGetCourses = createAction('[Courses] request Get Courses');

  export const requestGetCoursesSuccess = createAction('[Courses] request Get Courses Success', props<{ courses: Course[] }>());

  export const requestGetCoursesFail = createAction('[Courses] request Get Courses Fail');
  //single
  export const requestGetCourse = createAction('[Courses] request Get Course', props<{ id: string }>());

  export const requestGetCourseSuccess = createAction('[Courses] request Get Course Success', props<{ course: Course }>());

  export const requestGetCourseFail = createAction('[Courses] request Get Course Fail');
  //filtered
  export const requestGetFilteredCourses = createAction('[Courses] request Get Filtered Courses', props<{ searchValue: string }>());

  export const requestGetFilteredCoursesSuccess = createAction(
    '[Courses] request Get Filtered CoursesSuccess',
    props<{ courses: Course[] }>()
  );

  export const requestGetFilteredCoursesFail = createAction('[Courses] request Get Filtered CoursesFail');
  //create
  export const requestCreateCourse = createAction('[Courses] request Create Course', props<{ course: Course }>());

  export const requestCreateCourseSuccess = createAction('[Courses] request Create Course Success');

  export const requestCreateCourseFail = createAction('[Courses] request Create Course Fail');
  //edit
  export const requestEditCourse = createAction('[Courses] request Edit Course', props<{ course: Course }>());

  export const requestEditCourseSuccess = createAction('[Courses] request Edit Course Success');

  export const requestEditCourseFail = createAction('[Courses] request Edit Course Fail');
  //delete
  export const requestDeleteCourse = createAction('[Courses] request Delete Course', props<{ course: Course }>());

  export const requestDeleteCourseSuccess = createAction('[Courses] request Delete Course Success');

  export const requestDeleteCourseFail = createAction('[Courses] request Delete Course Fail');
}
