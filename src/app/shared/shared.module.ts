import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent, ButtonComponent, InfoComponent, ModalComponent, SearchComponent } from './components';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailValidatorDirective } from './directive/email-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreationDate } from './pipe/creation-date';
import { Duration } from './pipe/duration';
import { StringJoiner } from './pipe/string-joiner';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
    EmailValidatorDirective,
    Duration,
    CreationDate,
    StringJoiner,
    PageNotFoundComponent,
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
    Duration,
    CreationDate,
    StringJoiner,
  ],
})
export class SharedModule {}
