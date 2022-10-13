import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { User } from 'src/app/app-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4000';
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public readonly isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient, private storage: SessionStorageService) {}

  login(user: User) {
    this.http.post(`${this.baseUrl}/login`, user).subscribe((response: any) => {
      if (response.successful === true && response.result !== undefined) {
        const token = response.result;
        this.isAuthorized$$.next(true);

        this.storage.setToken(token);
      }
    });
  }

  register(user: User): void {
    this.http.post(`${this.baseUrl}/register`, user);
  }

  logout(user: User): void {
    this.http.delete(`${this.baseUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
  }
}
