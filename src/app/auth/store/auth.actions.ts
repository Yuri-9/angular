import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/app-model';

export namespace AuthActions {
  export const requestLogin = createAction('[Auth] request Login', props<{ user: User }>());

  export const requestLoginSuccess = createAction('[Auth] request Login Success', props<{ token: string }>());

  export const requestLoginFail = createAction('[Auth] request Login Fail', props<{ errorMessageLogin: string }>());

  export const requestRegister = createAction('[Auth] request Register', props<{ user: User }>());

  export const requestRegisterSuccess = createAction('[Auth] request Register Success', props<{ user: User }>());

  export const requestRegisterFail = createAction('[Auth] request Register Fail', props<{ errorMessageRegister: string }>());

  export const requestLogout = createAction('[Auth] request Logout');

  export const requestLogoutSuccess = createAction('[Auth] request Logout Success');
}
