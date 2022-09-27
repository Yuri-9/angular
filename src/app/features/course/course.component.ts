import { Component, Input } from '@angular/core';
import { Course } from '../courses/courses.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input() course: Course = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };

  constructor() {}
}
