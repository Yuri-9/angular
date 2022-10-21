import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Author, FailedRequest, SuccessfulRequest } from '../app-model';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  private authors$$ = new BehaviorSubject<Author[]>([]);
  authors$: Observable<Author[]> = this.authors$$.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private _authorService: AuthorsService) {}

  getAll(): Observable<Author[]> {
    this.isLoading$$.next(true);
    return this._authorService.getAll().pipe(
      finalize(() => this.isLoading$$.next(false)),
      tap(authors => this.authors$$.next(authors))
    );
  }

  addAuthor(author: Author): Observable<SuccessfulRequest<Author> | FailedRequest> {
    return this._authorService.addAuthor(author);
  }

  deleteAuthor(author: Author): Observable<FailedRequest | {}> {
    return this._authorService.deleteAuthor(author);
  }
}
