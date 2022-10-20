import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserStateFacade } from '../store/user.facade';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _userStateFacade: UserStateFacade, private _router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._userStateFacade.isAdmin$.pipe(
      map(isAdmin => {
        return isAdmin || this._router.createUrlTree(['/courses']);
      })
    );
  }
}
