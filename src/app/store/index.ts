import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../auth/store/auth.effects';
import { AuthReducer, AuthState } from '../auth/store/auth.reducer';
import { UserEffects } from '../user/store/user.effects';
import { userReducer, UserState } from '../user/store/user.reducer';

export interface State {
  user: UserState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  auth: AuthReducer,
};

export const effects = [UserEffects, AuthEffects];
