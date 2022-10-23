import { Action, createReducer, on } from '@ngrx/store';
import { Author } from 'src/app/app-model';

import { AuthorsActions } from './authors.actions';

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Author[];
  addedAuthor: Author | null;
  isLoading: boolean;
}

export const initialState: AuthorsState = {
  authors: [],
  addedAuthor: null,
  isLoading: false,
};

const reducer = createReducer(
  initialState,
  on(AuthorsActions.requestAuthors, (state): AuthorsState => ({ ...state, isLoading: true })),
  on(
    AuthorsActions.requestAuthorsSuccess,
    (state, { authors }): AuthorsState => ({ ...state, authors: authors, addedAuthor: null, isLoading: false })
  ),
  on(AuthorsActions.requestAuthorsFail, (state): AuthorsState => ({ ...state, isLoading: false })),

  on(AuthorsActions.requestAddAuthor, (state): AuthorsState => ({ ...state, isLoading: true })),
  on(AuthorsActions.requestAddAuthorSuccess, (state, { author }): AuthorsState => ({ ...state, addedAuthor: author })),
  on(AuthorsActions.requestAddAuthorFail, (state): AuthorsState => ({ ...state, isLoading: false })),

  on(AuthorsActions.requestDeleteAuthor, (state): AuthorsState => ({ ...state, isLoading: true })),
  on(AuthorsActions.requestDeleteAuthorSuccess, (state): AuthorsState => ({ ...state })),
  on(AuthorsActions.requestAddAuthorFail, (state): AuthorsState => ({ ...state, isLoading: false }))
);

export const authorsReducer = (state: AuthorsState | undefined, action: Action): AuthorsState => reducer(state, action);
