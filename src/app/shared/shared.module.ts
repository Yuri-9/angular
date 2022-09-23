import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { ButtonComponent } from './components';

@NgModule({
  declarations: [HeaderComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ButtonComponent],
})
export class SharedModule {}
