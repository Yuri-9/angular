import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from '../course/course.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseFormComponent } from '../course-form/course-form.component';

@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseListComponent, CourseFormComponent],
  imports: [CommonModule, SharedModule],
  bootstrap: [CoursesComponent],
  exports: [CoursesComponent],
})
export class CoursesModule {}
