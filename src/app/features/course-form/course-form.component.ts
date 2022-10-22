import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Author } from 'src/app/app-model';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';

import { authorFieldValidator } from 'src/app/common/validators/author-field-validator';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

import { Course } from '../courses/courses-model';

const MINUTES_IN_DAY = 1440;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new ReplaySubject(1);
  isSubmitted = false;
  authors: Author[] = [];
  initialCourse: Course | null = null;
  buttonSaveText = '';

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl('', [Validators.min(0), Validators.max(MINUTES_IN_DAY)]),
  });

  formAuthor: FormGroup = new FormGroup({
    authorName: new FormControl('', [authorFieldValidator()]),
  });

  formAuthorList: FormGroup = new FormGroup({
    authorList: new FormArray(
      [
        new FormGroup({
          name: new FormControl(''),
        }),
      ],
      [Validators.required]
    ),
  });

  constructor(private authorsStateFacade: AuthorsStateFacade, private coursesStoreService: CoursesStoreService, private router: Router) {
    const course = this.router.getCurrentNavigation()?.extras.state as Course;
    if (course) {
      this.initialCourse = course;
    }
  }

  ngOnInit(): void {
    this.initAuthorsLoad();
    this.initForm();
    this.initFormOption();
  }

  get title(): any {
    return this.form.get('title');
  }

  get description(): any {
    return this.form.get('description');
  }

  get authorName(): any {
    return this.formAuthor.get('authorName');
  }

  get duration(): any {
    return this.form.get('duration');
  }

  get authorsList(): any {
    return this.formAuthorList.controls['authorList'] as FormArray;
  }

  get isEdit(): boolean {
    return !!this.initialCourse;
  }

  saveCourse(): void {
    this.isSubmitted = true;

    const { title, description, duration } = this.form.value;
    const { authorList } = this.formAuthorList.value;
    const authorsIdList = (authorList as Author[]).map(({ id }) => id || '');
    if (this.form.valid && this.authorsList.valid) {
      const newCourse: Course = {
        id: this.initialCourse?.id || '',
        title,
        description,
        duration,
        authors: authorsIdList,
      };

      if (this.isEdit) {
        this.coursesStoreService.editCourse(newCourse).pipe(takeUntil(this.destroy$)).subscribe();
      } else {
        this.coursesStoreService.createCourse(newCourse).pipe(takeUntil(this.destroy$)).subscribe();
      }

      this.router.navigateByUrl('/courses');
    } else {
      this.form.markAllAsTouched();
    }
  }

  createAuthor(event: Event): void {
    event.preventDefault();

    if (this.authorName.value && this.authorName.valid) {
      this.authorsStateFacade.addAuthor({ name: this.authorName.value });

      this.formAuthor.controls['authorName'].setValue('');
    }
  }

  deleteAuthor(event: Event, author: FormGroup): void {
    event.preventDefault();

    this.authorsStateFacade.deleteAuthor(author.value);
  }

  initForm(): void {
    if (this.initialCourse) {
      this.title.setValue(this.initialCourse.title);
      this.description.setValue(this.initialCourse.description);
      this.duration.setValue(this.initialCourse.duration);
    }
  }

  initFormOption(): void {
    this.buttonSaveText = this.isEdit ? 'Save course' : 'Create course';
  }

  initAuthorsLoad(): void {
    this.authorsStateFacade.getAuthors();

    this.authorsStateFacade.authors$.pipe(takeUntil(this.destroy$)).subscribe(authors => {
      this.authorsList.clear();

      authors.forEach(author => {
        const item = new FormGroup({
          name: new FormControl(author.name),
          id: new FormControl(author.id),
        });
        this.authorsList.push(item);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }
}
