import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { ButtonComponent } from './components';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [HeaderComponent, ButtonComponent, InfoComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ButtonComponent, InfoComponent],
})
export class SharedModule {}
