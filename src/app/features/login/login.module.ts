import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  bootstrap: [LoginComponent],
  exports: [LoginComponent, FormsModule],
})
export class LoginModule {}
