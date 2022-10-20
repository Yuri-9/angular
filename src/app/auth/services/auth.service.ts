import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { User } from 'src/app/app-model';
import { InitialUserAdminData, PostResponse } from './auth-model';
import { environment } from 'src/environments/environment';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  readonly isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  isRegistered: boolean = false;

  authLoader$ = new BehaviorSubject<boolean>(false);

  // InitialUserAdminData login as admin. It allows to avoid 403 error
  user: User = InitialUserAdminData;

  constructor(private _http: HttpClient, private _storage: SessionStorageService, private _userStoreService: UserStoreService) {}

  getUser(): User {
    return this.user;
  }

  login(user: User): Observable<User> {
    this.authLoader$.next(true);
    return this._http.post(`${environment.baseUrl}/login`, user).pipe(
      finalize(() => {
        this.authLoader$.next(false);
      }),
      catchError(({ error }) => of(error)),
      switchMap((response: any) => {
        if (response.successful === true && response.result !== undefined) {
          const token = response.result;
          this.isAuthorized$$.next(true);
          this._storage.setToken(token);
          this.user.accessToken = token;
          return this._userStoreService.getUser();
        }
        return EMPTY;
      })
    );
  }

  register(user: User): Observable<boolean> {
    this.authLoader$.next(true);
    return this._http.post<PostResponse>(`${environment.baseUrl}/register`, user).pipe(
      finalize(() => {
        this.authLoader$.next(false);
      }),
      catchError(({ error }) => of(error)),
      map(response => {
        if (response.successful === true) {
          this.user = { ...user };
          this.isRegistered = true;
          return true;
        } else {
          this.isRegistered = false;
          return false;
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this._storage.getToken();
    return this._http
      .delete(`${environment.baseUrl}/logout`, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(
        tap(() => {
          this.isAuthorized$$.next(false);
          this._storage.deleteToken();
        })
      );
  }
}
