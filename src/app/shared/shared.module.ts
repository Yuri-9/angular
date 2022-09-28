import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  SearchComponent,
} from './components';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
