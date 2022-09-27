import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { ButtonComponent } from './components';
import { InfoComponent } from './components/info/info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [HeaderComponent, ButtonComponent, InfoComponent, SearchComponent],
})
export class SharedModule {}
