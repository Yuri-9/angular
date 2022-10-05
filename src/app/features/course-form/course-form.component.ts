import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_ROUTS } from 'src/app/app.model';
import { latinLettersAndNumbersValidator } from 'src/app/common/validators/latin-letters-and-numbers-validator';
import { Course } from '../courses/courses.model';
import { DatePipe } from '@angular/common';

const MINUTES_IN_DAY = 1440;

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  isSubmitted = false;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl('', [
      Validators.min(0),
      Validators.max(MINUTES_IN_DAY),
    ]),
  });

  formAuthor: FormGroup = new FormGroup({
    authorName: new FormControl('', [latinLettersAndNumbersValidator()]),
  });

  formAuthorList: FormGroup = new FormGroup({
    authorList: new FormArray([], [Validators.required]),
  });
  constructor(public datepipe: DatePipe) {}

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

  get authorList(): any {
    return this.formAuthorList.controls['authorList'];
  }
  get authorListControls(): any {
    return (this.formAuthorList.controls['authorList'] as FormArray).controls;
  }

  @Output() createEvent = new EventEmitter<Course>();

  onSubmit() {
    this.isSubmitted = true;
    console.log('this.authorList.valid', this.authorList.valid);
    const { title, description, duration } = this.form.value;
    const { authorList } = this.formAuthorList.value;
    if (this.form.valid && this.authorList.valid) {
      const newCourse: Course = {
        id: 'sdf',
        title,
        description,
        duration,
        authors: authorList,
        creationDate: this.datepipe.transform(new Date(), 'dd-MM-yyyy') || '',
      };

      this.createEvent.emit(newCourse);
    } else {
      this.form.markAllAsTouched();
    }
  }

  createAuthor(event: Event) {
    event.preventDefault();

    if (this.authorName.value && this.authorName.valid) {
      const newAuthor = new FormControl(this.authorName.value);
      (this.formAuthorList.controls['authorList'] as FormArray).push(newAuthor);
      this.formAuthor.controls['authorName'].setValue('');
    }
  }

  deleteAuthor(event: Event, index: number) {
    event.preventDefault();
    (this.formAuthorList.controls['authorList'] as FormArray).removeAt(index);
  }
}
