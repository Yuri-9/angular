import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(private _authService: AuthService) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isAuthorized$;
  }
}
