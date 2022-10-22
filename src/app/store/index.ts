import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../auth/store/auth.effects';
import { AuthReducer, AuthState } from '../auth/store/auth.reducer';
import { AuthorsEffects } from './authors/authors.effects';
import { AuthorsReducer, AuthorsState } from './authors/authors.reducer';
import { UserEffects } from '../user/store/user.effects';
import { userReducer, UserState } from '../user/store/user.reducer';

export interface State {
  user: UserState;
  auth: AuthState;
  author: AuthorsState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  auth: AuthReducer,
  author: AuthorsReducer,
};

export const effects = [UserEffects, AuthEffects, AuthorsEffects];
