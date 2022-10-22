import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthorsService } from 'src/app/services/authors.service';

import { AuthorsActions } from './authors.actions';
import { AuthorsStateFacade } from './authors.facade';

@Injectable()
export class AuthorsEffects {
  getAuthors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorsActions.requestAuthors),
      mergeMap(() =>
        this.authorService.getAll().pipe(
          map(authors => AuthorsActions.requestAuthorsSuccess({ authors })),
          catchError(() => of(AuthorsActions.requestAuthorsFail()))
        )
      )
    );
  });

  addAuthor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorsActions.requestAddAuthor),
      mergeMap(({ author }) =>
        this.authorService.addAuthor(author).pipe(
          map(author => {
            this.authorStateFacade.getAuthors();
            return AuthorsActions.requestAddAuthorSuccess({ author });
          }),

          catchError(() => of(AuthorsActions.requestAddAuthorFail()))
        )
      )
    );
  });

  deleteAuthor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorsActions.requestDeleteAuthor),
      mergeMap(({ author }) =>
        this.authorService.deleteAuthor(author).pipe(
          map(() => {
            this.authorStateFacade.getAuthors();
            return AuthorsActions.requestDeleteAuthorSuccess();
          }),
          catchError(() => of(AuthorsActions.requestDeleteAuthorFail()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private authorService: AuthorsService, private authorStateFacade: AuthorsStateFacade) {}
}
