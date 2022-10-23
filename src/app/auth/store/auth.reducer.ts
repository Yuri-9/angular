import { Action, createReducer, on } from '@ngrx/store';

import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean;
  token: string;
  errorMessageLogin: string;
  errorMessageRegister: string;
  isRegistered: boolean;
  isLoading: boolean;
  userName: '';
}

export const initialState: AuthState = {
  isAuthorized: false,
  token: '',
  errorMessageLogin: '',
  isRegistered: false,
  errorMessageRegister: '',
  isLoading: false,
  userName: '',
};

const reducer = createReducer(
  initialState,
  on(AuthActions.requestLogin, (state): AuthState => ({ ...state, isLoading: true })),
  on(
    AuthActions.requestLoginSuccess,
    (state, { token }): AuthState => ({ ...state, token, isAuthorized: true, errorMessageLogin: '', isLoading: false })
  ),
  on(
    AuthActions.requestLoginFail,
    (state, { errorMessageLogin }): AuthState => ({ ...state, errorMessageLogin, isAuthorized: false, isLoading: false })
  ),

  on(AuthActions.requestLogout, (state): AuthState => ({ ...state, isAuthorized: false })),

  on(AuthActions.requestRegister, (state): AuthState => ({ ...state, isLoading: true })),
  on(
    AuthActions.requestRegisterSuccess,
    (state): AuthState => ({ ...state, isRegistered: true, errorMessageRegister: '', isLoading: false })
  ),
  on(
    AuthActions.requestRegisterFail,
    (state, { errorMessageRegister }): AuthState => ({ ...state, errorMessageRegister, isRegistered: false, isLoading: false })
  )
);

export const authReducer = (state: AuthState | undefined, action: Action): AuthState => reducer(state, action);
