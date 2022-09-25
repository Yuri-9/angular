import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private dataService: DataService) {}

  showCourse(id: string) {
    console.log('show course', id);
  }

  editCourse(id: string) {
    console.log('edit course', id);
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  addCourse() {
    console.log('add course');
  }

  ngOnInit(): void {
    console.log('ngOnInit');

    this.courses = this.dataService.getCourses();
  }
}
