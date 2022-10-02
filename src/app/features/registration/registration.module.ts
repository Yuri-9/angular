import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  bootstrap: [RegistrationComponent],
  exports: [RegistrationComponent, FormsModule],
})
export class RegistrationModule {}
