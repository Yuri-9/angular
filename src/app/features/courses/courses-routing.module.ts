import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseViewComponent } from '../course-view/course-view.component';

import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: 'add', component: CourseFormComponent },
      { path: ':id', component: CourseViewComponent },
      { path: 'edit/:id', component: CourseFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
