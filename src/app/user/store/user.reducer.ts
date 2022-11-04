import { Action, createReducer, on } from '@ngrx/store';

import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  isAdmin: boolean;
  name: string;
}

export const initialState: UserState = {
  isAdmin: false,
  name: '',
};

const reducer = createReducer(
  initialState,
  on(UserActions.requestCurrentUserSuccess, (_, { isAdmin, name }): UserState => ({ isAdmin, name }))
);

export const userReducer = (state: UserState | undefined, action: Action): UserState => reducer(state, action);
