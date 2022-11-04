import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/app-model';

export namespace AuthorsActions {
  export const requestAuthors = createAction('[Authors] request Authors');

  export const requestAuthorsSuccess = createAction('[Authors] request Authors Success', props<{ authors: Author[] }>());

  export const requestAuthorsFail = createAction('[Authors] request Authors Fail');

  export const requestAddAuthor = createAction('[Authors] request Add Author', props<{ author: Author }>());

  export const requestAddAuthorSuccess = createAction('[Authors] request Add Author Success', props<{ author: Author }>());

  export const requestAddAuthorFail = createAction('[Authors] request Add Author Fail');

  export const requestDeleteAuthor = createAction('[Authors] request Delete Author', props<{ author: Author }>());

  export const requestDeleteAuthorSuccess = createAction('[Authors] request Delete Author Success');

  export const requestDeleteAuthorFail = createAction('[Authors] request Delete Author Fail');
}
