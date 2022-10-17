import { Component, OnInit } from '@angular/core';
import { Course } from '../courses/courses-model';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IModal } from 'src/app/shared/components';
import { Router } from '@angular/router';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  iconButtonEdit = faPencil;
  iconButtonDelete = faTrash;
  canEdit = true;
  courses: Course[] = [];
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

  constructor(private _router: Router, private _courseStoreService: CoursesStoreService) {}

  showCourse(course: Course): void {
    console.log('show ', course);
    this._router.navigateByUrl(`/courses/${course.id}`, { state: course });
  }

  editCourse(course: Course) {
    this._router.navigateByUrl(`/courses/edit/${course.id}`, { state: course });
  }

  openModalDelete(course: Course): void {
    this.isOpenModal = true;
    this.currentCourse = course;
    this.optionModalDelete.message = `Are you sure you want to delete the <b>${course.title}</b> course?`;
  }

  searchCourse(title: string) {
    this._courseStoreService.filterCourse({ title }).subscribe();
  }

  confirmButtonModalDelete(): void {
    this.currentCourse &&
      this._courseStoreService
        .deleteCourse(this.currentCourse)
        .pipe(concatMap(() => this._courseStoreService.getAll()))
        .subscribe();

    this.closeModal();
  }

  closeModal(): void {
    this.isOpenModal = false;
  }

  ngOnInit(): void {
    this._courseStoreService.getAll().subscribe();

    this._courseStoreService.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }
}
