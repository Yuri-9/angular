import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/user/guards/admin.guard';
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
      { path: 'add', canActivate: [AdminGuard], component: CourseFormComponent },
      { path: ':id', component: CourseViewComponent },
      { path: 'edit/:id', canActivate: [AdminGuard], component: CourseFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
