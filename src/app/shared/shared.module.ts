import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { ButtonComponent } from './components';
import { InfoComponent } from './components/info/info.component';
import { DataService } from './data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent, ButtonComponent, InfoComponent],
  imports: [CommonModule, FontAwesomeModule],
  providers: [DataService],
  exports: [HeaderComponent, ButtonComponent, InfoComponent],
})
export class SharedModule {}
