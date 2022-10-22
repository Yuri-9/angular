import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authorFeatureKey, AuthorsState } from './authors.reducer';

export namespace AuthorsSelectors {
  const selectAuthor = createFeatureSelector<AuthorsState>(authorFeatureKey);

  export const selectAddedAuthor = createSelector(selectAuthor, (state: AuthorsState) => state.addedAuthor);
  export const selectAuthors = createSelector(selectAuthor, (state: AuthorsState) => state.authors);
}
