import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FailedRequest, SuccessfulRequest } from 'src/app/app-model';

import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.requestLogin),
      mergeMap(({ user }) =>
        this.authService.login(user).pipe(
          map(token => AuthActions.requestLoginSuccess({ token })),
          catchError(({ error }: { error: SuccessfulRequest<string> }) => {
            return of(AuthActions.requestLoginFail({ errorMessageLogin: error.result }));
          })
        )
      )
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.requestRegister),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          map(user => AuthActions.requestRegisterSuccess({ user })),
          catchError(({ error }: { error: FailedRequest }) => {
            return of(AuthActions.requestRegisterFail({ errorMessageRegister: error.errors?.[0] || '' }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
