import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../courses/courses.component';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BUTTON_ICON } from 'src/app/shared/components';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() canEdit = false;
  @Input() course: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  public iconButtonEdit = faPencil;
  public iconButtonDelete = faTrash;

  constructor() {}
}
