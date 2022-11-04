import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors } from './auth.selectors';
import { User } from 'src/app/app-model';
import { AuthActions } from './auth.actions';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class AuthStateFacade {
  isAuthorized$ = this.store.select(AuthSelectors.selectIsAuthorized);
  token$ = this.store.select(AuthSelectors.selectToken);
  errorMessageLogin$ = this.store.select(AuthSelectors.selectErrorMessageLogin);
  isRegistered$ = this.store.select(AuthSelectors.selectIsRegistered);
  errorMessageRegistered$ = this.store.select(AuthSelectors.selectErrorMessageRegistered);
  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  userName$ = this.store.select(AuthSelectors.selectUserName);

  constructor(private store: Store, private sessionStorageService: SessionStorageService) {}

  login(user: User): void {
    this.store.dispatch(AuthActions.requestLogin({ user }));
  }

  register(user: User): void {
    this.store.dispatch(AuthActions.requestRegister({ user }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.requestLogout());
  }

  closeSession(): void {
    this.store.dispatch(AuthActions.requestLogoutSuccess());
  }

  setAuthorization(): void {
    this.store.dispatch(AuthActions.requestLoginSuccess({ token: this.sessionStorageService.getToken() }));
  }
}
