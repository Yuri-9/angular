import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGet } from '../app-model';
import { Course } from '../features/courses/courses-model';

export interface SearchQueriesCourse {
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this._http.get<ResponseGet<Course[]>>(`${environment.baseUrl}/courses/all`).pipe(
      delay(1000),
      map(response => response.result)
    );
  }

  createCourse(course: Course): Observable<any> {
    return this._http.post(`${environment.baseUrl}/courses/add`, course).pipe(delay(1000));
  }

  editCourse(course: Course): Observable<any> {
    return this._http.put(`${environment.baseUrl}/courses/${course.id}`, course).pipe(delay(1000));
  }

  getCourse(course: Course): Observable<any> {
    return this._http.get(`${environment.baseUrl}/courses/${course.title}`).pipe(delay(1000));
  }

  filterCourse(queries: SearchQueriesCourse): Observable<any> {
    const filterQueries = queries.title ? `title=${queries.title}` : '';

    return this._http.get<ResponseGet<Course[]>>(`${environment.baseUrl}/courses/filter?${filterQueries}`).pipe(
      delay(1000),
      map(response => response.result)
    );
  }

  deleteCourse(course: Course): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/courses/${course.id}`).pipe(delay(1000));
  }
}
