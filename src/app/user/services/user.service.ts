import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { SuccessfulRequest, User } from 'src/app/app-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUser(): Observable<User> {
    return this._http.get<SuccessfulRequest<User>>(`${environment.baseUrl}/users/me`).pipe(
      delay(1000),
      map(response => response.result)
    );
  }
}
