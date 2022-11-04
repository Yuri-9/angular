import { Component } from '@angular/core';
import { Course } from '../courses/courses-model';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IModal } from 'src/app/shared/components';
import { Router } from '@angular/router';

import { UserStateFacade } from 'src/app/user/store/user.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;

  isAdmin$ = this.userStateFacade.isAdmin$;
  courses$ = this.coursesStateFacade.courses$;
  private currentCourse: Course | null = null;
  isOpenModal = false;
  optionModalDelete: IModal = {
    title: 'Delete course',
    message: '',
    okButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  };

  infoOption = {
    title: 'Your list is empty',
    message: "Please use the <b>'Add new course'</b> button to add your first course",
    buttonText: 'Add new course',
  };

  constructor(private router: Router, private coursesStateFacade: CoursesStateFacade, private userStateFacade: UserStateFacade) {
    this.coursesStateFacade.getCourses();
  }

  showCourse(course: Course): void {
    this.router.navigateByUrl(`/courses/${course.id}`, { state: course });
  }

  editCourse(course: Course): void {
    this.router.navigateByUrl(`/courses/edit/${course.id}`, { state: course });
  }

  openModalDelete(course: Course): void {
    this.isOpenModal = true;
    this.currentCourse = course;
    this.optionModalDelete.message = `Are you sure you want to delete the <b>${course.title}</b> course?`;
  }

  searchCourse(title: string): void {
    this.coursesStateFacade.getFilteredCourses(title);
  }

  confirmButtonModalDelete(): void {
    this.currentCourse && this.coursesStateFacade.deleteCourse(this.currentCourse);
    this.closeModal();
  }

  closeModal(): void {
    this.isOpenModal = false;
  }
}
