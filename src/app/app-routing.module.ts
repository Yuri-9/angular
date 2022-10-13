import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { CourseComponent } from './features/course/course.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./features/registration/registration.module').then(m => m.RegistrationModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
