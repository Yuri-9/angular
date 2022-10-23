import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, FormsModule, RouterModule.forChild(routes)],
  bootstrap: [LoginComponent],
  exports: [LoginComponent, FormsModule],
})
export class LoginModule {}
