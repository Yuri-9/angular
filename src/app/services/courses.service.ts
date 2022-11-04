import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FailedRequest, SuccessfulRequest } from '../app-model';
import { DELAY_REQUEST } from '../common/constants';
import { Course } from '../features/courses/courses-model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get<SuccessfulRequest<Course[]>>(`${environment.baseUrl}/courses/all`).pipe(
      delay(DELAY_REQUEST),
      map(response => response.result)
    );
  }

  createCourse(course: Course): Observable<SuccessfulRequest<Course> | FailedRequest> {
    return this.http
      .post<SuccessfulRequest<Course> | FailedRequest>(`${environment.baseUrl}/courses/add`, course)
      .pipe(delay(DELAY_REQUEST));
  }

  editCourse(course: Course): Observable<SuccessfulRequest<Course> | FailedRequest> {
    return this.http
      .put<SuccessfulRequest<Course> | FailedRequest>(`${environment.baseUrl}/courses/${course.id}`, course)
      .pipe(delay(DELAY_REQUEST));
  }

  filterCourse(searchValue: string): Observable<Course[]> {
    const filterQueries = searchValue ? `title=${searchValue}` : '';

    return this.http.get<SuccessfulRequest<Course[]>>(`${environment.baseUrl}/courses/filter?${filterQueries}`).pipe(
      delay(DELAY_REQUEST),
      map(response => response.result)
    );
  }

  deleteCourse(course: Course): Observable<FailedRequest | {}> {
    return this.http.delete(`${environment.baseUrl}/courses/${course.id}`).pipe(delay(DELAY_REQUEST));
  }
}
