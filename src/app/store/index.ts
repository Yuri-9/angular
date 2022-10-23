import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../auth/store/auth.effects';
import { authReducer, AuthState, authFeatureKey } from '../auth/store/auth.reducer';
import { AuthorsEffects } from './authors/authors.effects';
import { authorsReducer, AuthorsState, authorsFeatureKey } from './authors/authors.reducer';
import { UserEffects } from '../user/store/user.effects';
import { userReducer, UserState, userFeatureKey } from '../user/store/user.reducer';
import { coursesReducer, CoursesState, coursesFeatureKey } from './courses/courses.reducer';
import { CoursesEffects } from './courses/courses.effects';

export interface State {
  user: UserState;
  auth: AuthState;
  authors: AuthorsState;
  courses: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  [userFeatureKey]: userReducer,
  [authFeatureKey]: authReducer,
  [authorsFeatureKey]: authorsReducer,
  [coursesFeatureKey]: coursesReducer,
};

export const effects = [UserEffects, AuthEffects, AuthorsEffects, CoursesEffects];
