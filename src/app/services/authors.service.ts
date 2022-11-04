import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, FailedRequest, SuccessfulRequest } from '../app-model';
import { DELAY_REQUEST } from '../common/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http.get<SuccessfulRequest<Author[]>>(`${environment.baseUrl}/authors/all`).pipe(
      delay(DELAY_REQUEST),
      map(response => response.result)
    );
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<SuccessfulRequest<Author>>(`${environment.baseUrl}/authors/add`, author).pipe(
      delay(DELAY_REQUEST),
      map(response => response.result)
    );
  }

  deleteAuthor(author: Author): Observable<FailedRequest | {}> {
    return this.http.delete(`${environment.baseUrl}/authors/${author.id}`).pipe(delay(DELAY_REQUEST));
  }
}
