import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authorsFeatureKey, AuthorsState } from './authors.reducer';

export namespace AuthorsSelectors {
  const selectAuthor = createFeatureSelector<AuthorsState>(authorsFeatureKey);

  export const selectAddedAuthor = createSelector(selectAuthor, (state: AuthorsState) => state.addedAuthor);
  export const selectAuthors = createSelector(selectAuthor, (state: AuthorsState) => state.authors);
  export const selectIsLoading = createSelector(selectAuthor, (state: AuthorsState) => state.isLoading);
}
