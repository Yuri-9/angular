import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, map, Observable, tap } from 'rxjs';
import { Author } from '../app-model';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  private authors$$ = new BehaviorSubject<Author[]>([]);
  authors$: Observable<Author[]> = this.authors$$.asObservable();

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private _authorService: AuthorsService) {}

  getAll(): Observable<Author[]> {
    this.isLoading$.next(true);
    return this._authorService.getAll().pipe(
      finalize(() => this.isLoading$.next(false)),
      tap(authors => this.authors$$.next(authors))
    );
  }

  addAuthor(author: Author): Observable<any> {
    return this._authorService.addAuthor(author);
  }

  deleteAuthor(author: Author): Observable<any> {
    return this._authorService.deleteAuthor(author);
  }
}
