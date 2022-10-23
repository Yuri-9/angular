import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () => import('./features/registration/registration.module').then(m => m.RegistrationModule),
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
