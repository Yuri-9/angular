import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, FailedRequest, SuccessfulRequest } from '../app-model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this._http.get<SuccessfulRequest<Author[]>>(`${environment.baseUrl}/authors/all`).pipe(map(response => response.result));
  }

  addAuthor(author: Author): Observable<SuccessfulRequest<Author> | FailedRequest> {
    return this._http.post<SuccessfulRequest<Author> | FailedRequest>(`${environment.baseUrl}/authors/add`, author);
  }

  deleteAuthor(author: Author): Observable<FailedRequest | {}> {
    return this._http.delete(`${environment.baseUrl}/authors/${author.id}`);
  }
}
