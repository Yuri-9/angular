import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { User } from 'src/app/app-model';
import { Router } from '@angular/router';
import { PostResponse } from './auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4000';

  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  readonly isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  isRegistered: boolean = false;

  authLoader$ = new BehaviorSubject<boolean>(false);
  user: User = {
    name: '',
    email: '',
    password: '',
    accessToken: '',
  };

  constructor(private _http: HttpClient, private _storage: SessionStorageService, private _router: Router) {}

  getUser() {
    return this.user;
  }
  login(user: User) {
    this.authLoader$.next(true);
    this._http
      .post(`${this.baseUrl}/login`, user)
      .pipe(
        finalize(() => {
          this.authLoader$.next(false);
        }),
        catchError(({ error }) => of(error)),
        tap(value => {
          console.log(value);
        })
      )
      .subscribe((response: any) => {
        if (response.successful === true && response.result !== undefined) {
          const token = response.result;
          this.isAuthorized$$.next(true);
          this._storage.setToken(token);
          this.user.accessToken = token;
        }
      });
  }

  register(user: User): Observable<any> {
    this.authLoader$.next(true);
    return this._http.post<PostResponse>(`${this.baseUrl}/register`, user).pipe(
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

  logout(): void {
    const token = this._storage.getToken();
    this._http
      .delete(`${this.baseUrl}/logout`, {
        headers: {
          Authorization: token,
        },
      })
      .subscribe(() => {
        this.isAuthorized$$.next(false);
        this._storage.deleteToken();
      });
  }
}
