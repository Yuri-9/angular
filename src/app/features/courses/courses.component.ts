import { Component, EventEmitter, Output } from '@angular/core';
import { APP_ROUTS } from 'src/app/app.model';

import { courses, Course, User } from './courses.model';

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
  user: User = { name: 'Vasia' };

  @Output() logoutEvent = new EventEmitter();

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
    this.logoutEvent.emit(APP_ROUTS.LOGIN);
  }
}
