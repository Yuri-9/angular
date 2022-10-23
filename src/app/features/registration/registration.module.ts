import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];
@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, SharedModule, FormsModule, RouterModule.forChild(routes)],
  bootstrap: [RegistrationComponent],
  exports: [RegistrationComponent, FormsModule],
})
export class RegistrationModule {}
