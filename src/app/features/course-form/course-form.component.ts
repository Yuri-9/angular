import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, switchMap, take, takeUntil } from 'rxjs';
import { Author } from 'src/app/app-model';

import { authorFieldValidator } from 'src/app/common/validators/author-field-validator';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';

import { Course } from '../courses/courses-model';

const MINUTES_IN_DAY = 1440;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  isSubmitted = false;
  private readonly destroy$ = new ReplaySubject(1);
  authors: Author[] = [];

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
  constructor(private _authorsStoreService: AuthorsStoreService) {}

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

  @Output() createEvent = new EventEmitter<Course>();

  onSubmit() {
    this.isSubmitted = true;

    const { title, description, duration } = this.form.value;
    const { authorList } = this.formAuthorList.value;
    if (this.form.valid && this.authorsList.valid) {
      const newCourse: Course = {
        id: 'sdf',
        title,
        description,
        duration,
        authors: authorList,
        creationDate: new Date().toISOString(),
      };

      this.createEvent.emit(newCourse);
    } else {
      this.form.markAllAsTouched();
    }
  }

  createAuthor(event: Event) {
    event.preventDefault();

    if (this.authorName.value && this.authorName.valid) {
      this._authorsStoreService
        .addAuthor({ name: this.authorName.value })
        .pipe(switchMap(() => this._authorsStoreService.getAll()))
        .subscribe();

      this.formAuthor.controls['authorName'].setValue('');
    }
  }

  deleteAuthor(event: Event, author: FormGroup) {
    event.preventDefault();

    this._authorsStoreService
      .deleteAuthor(author.value)
      .pipe(switchMap(() => this._authorsStoreService.getAll()))
      .subscribe();
  }

  ngOnInit(): void {
    this._authorsStoreService.getAll().subscribe();

    this._authorsStoreService.authors$.subscribe(authors => {
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
