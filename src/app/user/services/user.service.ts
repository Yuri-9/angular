import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SuccessfulRequest, User } from 'src/app/app-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<SuccessfulRequest<User>>(`${environment.baseUrl}/users/me`).pipe(map(response => response.result));
  }
}
