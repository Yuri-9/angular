import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserSelectors } from './user.selectors';

@Injectable()
export class UserStateFacade {
  name$ = this.store.select(UserSelectors.selectUserGetName);
  isAdmin$ = this.store.select(UserSelectors.selectUserIsAdmin);

  constructor(private store: Store) {}

  getCurrentUser(): void {
    this.store.dispatch(UserActions.requestCurrentUser());
  }
}
