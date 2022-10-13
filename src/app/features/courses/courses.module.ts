import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from '../course/course.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  { path: 'add', component: CourseFormComponent },
  { path: ':id', component: CourseComponent },
  { path: 'edit/:id', component: CourseFormComponent },
];
@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseListComponent, CourseFormComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  bootstrap: [CoursesComponent],
  exports: [CoursesComponent],
})
export class CoursesModule {}
