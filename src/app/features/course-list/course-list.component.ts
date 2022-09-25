import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses/courses.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() canEdit = false;
  @Output() showCourseEvent = new EventEmitter();
  @Output() editCourseEvent = new EventEmitter();
  @Output() deleteCourseEvent = new EventEmitter();

  constructor() {}

  showCourse(value: string) {
    this.showCourseEvent.emit(value);
  }
  editCourse(value: string) {
    this.editCourseEvent.emit(value);
  }

  deleteCourse(value: string) {
    console.log('delete', value);

    this.deleteCourseEvent.emit(value);
  }
}
