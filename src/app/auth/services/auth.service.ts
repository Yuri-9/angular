import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, finalize, map, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { FailedRequest, SuccessfulRequest, User } from 'src/app/app-model';
import { InitialUserAdminData } from './auth-model';
import { environment } from 'src/environments/environment';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authLoader$ = new BehaviorSubject<boolean>(false);

  //TODO InitialUserAdminData login as admin, remove it for prod
  user: User = InitialUserAdminData;

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService, private userStateFacade: UserStateFacade) {}

  getUser(): User {
    return this.user;
  }

  login(user: User): Observable<string> {
    this.authLoader$.next(true);
    return this.http.post<SuccessfulRequest<string>>(`${environment.baseUrl}/login`, user).pipe(
      finalize(() => {
        this.authLoader$.next(false);
      }),
      filter(response => response.successful === true),
      map(response => {
        const token = response.result;
        this.sessionStorageService.setToken(token);
        this.user.accessToken = token;
        return token;
      }),
      tap(() => {
        this.userStateFacade.getCurrentUser();
      })
    );
  }

  register(user: User): Observable<User> {
    this.authLoader$.next(true);
    return this.http.post<SuccessfulRequest<User>>(`${environment.baseUrl}/register`, user).pipe(
      finalize(() => {
        this.authLoader$.next(false);
      }),
      filter(response => response.successful === true),
      map(response => response.result),
      tap(() => {
        this.user = { ...user };
      })
    );
  }

  logout(): Observable<FailedRequest | {}> {
    const token = this.sessionStorageService.getToken();
    return this.http
      .delete(`${environment.baseUrl}/logout`, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(
        tap(() => {
          this.sessionStorageService.deleteToken();
        })
      );
  }
}
