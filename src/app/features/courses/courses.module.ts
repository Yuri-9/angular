import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule],
  bootstrap: [CoursesComponent],
  exports: [CoursesComponent],
})
export class CoursesModule {}
