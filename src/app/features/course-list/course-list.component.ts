import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses/courses-model';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IModal } from 'src/app/shared/components';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;
  private currentCourseId = '';
  isOpenModal = false;
  optionModalDelete: IModal = {
    title: 'Delete course',
    message: '',
    okButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  };

  @Input() courses: Course[] = [];
  @Input() canEdit = false;
  @Output() showCourseEvent = new EventEmitter();
  @Output() editCourseEvent = new EventEmitter();
  @Output() deleteCourseEvent = new EventEmitter();

  constructor() {}

  showCourse(courseId: string): void {
    this.showCourseEvent.emit(courseId);
  }
  editCourse(courseId: string) {
    this.editCourseEvent.emit(courseId);
  }

  openModalDelete(course: Course): void {
    this.isOpenModal = true;
    this.currentCourseId = course.id;
    this.optionModalDelete.message = `Are you sure you want to delete the <b>${course.title}</b> course?`;
  }

  confirmButtonModalDelete(): void {
    this.deleteCourseEvent.emit(this.currentCourseId);
    this.closeModal();
  }

  closeModal(): void {
    this.isOpenModal = false;
  }
}
