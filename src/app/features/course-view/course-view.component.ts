import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import { UserStateFacade } from 'src/app/user/store/user.facade';
import { Course } from '../courses/courses-model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
})
export class CourseViewComponent {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;
  isAdmin$ = this.userStateFacade.isAdmin$;
  course: Course;

  constructor(private router: Router, private userStateFacade: UserStateFacade) {
    const course = this.router.getCurrentNavigation()?.extras.state as Course;

    this.course = course;
  }

  editCourse(course: Course): void {
    this.router.navigateByUrl(`/courses/edit/${course.id}`, { state: course });
  }

  navigateToCourses(): void {
    this.router.navigateByUrl(`/courses`);
  }
}
