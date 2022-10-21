import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, finalize, Observable, switchMap, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { FailedRequest, SuccessfulRequest, User } from 'src/app/app-model';
import { InitialUserAdminData } from './auth-model';
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

  //TODO InitialUserAdminData login as admin, remove it for prod
  user: User = InitialUserAdminData;

  constructor(private _http: HttpClient, private _storageService: SessionStorageService, private _userStoreService: UserStoreService) {}

  getUser(): User {
    return this.user;
  }

  login(user: User): Observable<User> {
    this.authLoader$.next(true);
    return this._http.post<SuccessfulRequest<string> | FailedRequest>(`${environment.baseUrl}/login`, user).pipe(
      finalize(() => {
        this.authLoader$.next(false);
      }),
      switchMap(response => {
        if (response.successful === true && response.result !== undefined) {
          const token = response.result;
          this.isAuthorized$$.next(true);
          this._storageService.setToken(token);
          this.user.accessToken = token;
          return this._userStoreService.getUser();
        }
        return EMPTY;
      })
    );
  }

  register(user: User): Observable<SuccessfulRequest<User> | FailedRequest> {
    this.authLoader$.next(true);
    return this._http.post<SuccessfulRequest<User> | FailedRequest>(`${environment.baseUrl}/register`, user).pipe(
      finalize(() => {
        this.authLoader$.next(false);
      }),
      tap(response => {
        if (response.successful === true) {
          this.user = { ...user };
        }
      })
    );
  }

  logout(): Observable<FailedRequest | {}> {
    const token = this._storageService.getToken();
    return this._http
      .delete(`${environment.baseUrl}/logout`, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(
        tap(() => {
          this.isAuthorized$$.next(false);
          this._storageService.deleteToken();
        })
      );
  }
}
