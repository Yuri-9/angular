import { ActionReducerMap } from '@ngrx/store';
import { UserEffects } from '../user/store/user.effects';
import { userReducer, UserState } from '../user/store/user.reducer';

export interface State {
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};

export const effects = [UserEffects];
