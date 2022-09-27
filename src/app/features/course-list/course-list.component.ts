import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses/courses.model';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  public iconButtonEdit = faPencil;
  public iconButtonDelete = faTrash;

  @Input() courses: Course[] = [];
  @Input() canEdit = false;
  @Output() showCourseEvent = new EventEmitter();
  @Output() editCourseEvent = new EventEmitter();
  @Output() deleteCourseEvent = new EventEmitter();

  constructor() {}

  showCourse(courseId: string) {
    this.showCourseEvent.emit(courseId);
  }
  editCourse(courseId: string) {
    this.editCourseEvent.emit(courseId);
  }

  deleteCourse(courseId: string) {
    this.deleteCourseEvent.emit(courseId);
  }
}
