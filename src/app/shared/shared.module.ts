import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  SearchComponent,
} from './components';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directive/email-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberToHoursMinutesPipe } from './pipe/number-to-hours-minutes.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
    EmailValidatorDirective,
    NumberToHoursMinutesPipe,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
    EmailValidatorDirective,
    ReactiveFormsModule,
    FontAwesomeModule,
    NumberToHoursMinutesPipe,
  ],
})
export class SharedModule {}
