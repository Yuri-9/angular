import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
  isAuthorized = false;

  constructor(private _authService: AuthService, private _router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    });
    if (!this.isAuthorized) {
      return true;
    }

    return this._router.createUrlTree(['/courses']);
  }
}
