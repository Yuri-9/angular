import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APP_ROUTS, User } from 'src/app/app.model';

import { courses, Course } from './courses.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  infoOption = {
    title: 'Your list is empty',
    message:
      "Please use the <b>'Add new course'</b> button to add your first course",
    buttonText: 'Add new course',
  };
  courses: Course[] = courses;
  buttonText = 'Logout';

  @Input() user: User = { name: '', email: '', password: '' };
  @Output() navigateEvent = new EventEmitter();

  showCourse(id: string) {
    console.log('show course', id);
  }

  editCourse(id: string) {
    console.log('edit course', id);
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  addCourse() {
    console.log('add course');
  }

  handleLogout(): void {
    this.navigateEvent.emit(APP_ROUTS.LOGIN);
  }
}
