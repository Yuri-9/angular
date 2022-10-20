import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userFeatureKey, UserState } from './user.reducer';

export namespace UserSelectors {
  const selectUser = createFeatureSelector<UserState>(userFeatureKey);

  export const selectUserGetName = createSelector(selectUser, (state: UserState) => state.name);
  export const selectUserIsAdmin = createSelector(selectUser, (state: UserState) => state.isAdmin);
}
