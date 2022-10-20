import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, ResponseGet } from '../app-model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this._http.get<ResponseGet<Author[]>>(`${environment.baseUrl}/authors/all`).pipe(map(response => response.result));
  }

  addAuthor(author: Author): Observable<any> {
    return this._http.post(`${environment.baseUrl}/authors/add`, author);
  }

  deleteAuthor(author: Author): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/authors/${author.id}`);
  }
}
