import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTS, User } from 'src/app/app-model';
import { AuthService } from 'src/app/auth/services/auth.service';

import { courses, Course } from './courses-model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  infoOption = {
    title: 'Your list is empty',
    message: "Please use the <b>'Add new course'</b> button to add your first course",
    buttonText: 'Add new course',
  };
  courses: Course[] = courses;
  buttonText = 'Logout';
  filterString = '';
  isEditCourse = false;

  constructor(private _authService: AuthService, private _router: Router) {}

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

  addCourseClickButton() {
    this.isEditCourse = true;
  }

  handleLogout(): void {
    this._authService.logout();
    this._router.navigateByUrl('login');
  }

  searchCourse(nameCourse: string) {
    this.filterString = nameCourse;
  }

  createCourse(course: Course) {
    this.courses.push(course);
    this.isEditCourse = false;
  }

  get filteredCourses() {
    const regExpFilterString = new RegExp(this.filterString, 'i');
    return this.courses.filter(({ title }) => title.match(regExpFilterString));
  }
}
