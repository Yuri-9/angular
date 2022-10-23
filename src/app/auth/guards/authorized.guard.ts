import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanLoad {
  isAuthorized = false;

  constructor(private _authService: AuthService, private _router: Router) {}
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    });
    if (this.isAuthorized) {
      return true;
    }

    return this._router.createUrlTree(['/login']);
  }
}
