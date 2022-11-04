import { createAction, props } from '@ngrx/store';

export namespace UserActions {
  export const requestCurrentUser = createAction('[User] request Current User');

  export const requestCurrentUserSuccess = createAction('[User] request Current User Success', props<{ isAdmin: boolean; name: string }>());

  export const requestCurrentUserFail = createAction('[User] request Current User Fail');
}
