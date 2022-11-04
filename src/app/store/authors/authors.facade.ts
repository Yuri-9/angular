import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Author } from 'src/app/app-model';
import { AuthorsActions } from './authors.actions';
import { AuthorsSelectors } from './authors.selectors';

@Injectable()
export class AuthorsStateFacade {
  authors$ = this.store.select(AuthorsSelectors.selectAuthors);
  isLoading$ = this.store.select(AuthorsSelectors.selectIsLoading);

  constructor(private store: Store) {}

  getAuthors(): void {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(author: Author): void {
    this.store.dispatch(AuthorsActions.requestAddAuthor({ author }));
  }

  deleteAuthor(author: Author): void {
    this.store.dispatch(AuthorsActions.requestDeleteAuthor({ author }));
  }
}
