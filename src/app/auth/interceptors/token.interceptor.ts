import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: { Authorization: `${this.authService.user.accessToken}` },
    });

    return next.handle(request).pipe(
      catchError((error): Observable<HttpEvent<any>> => {
        if (error.status === 401) {
          this.router.navigateByUrl('login');
        }
        return throwError(error);
      })
    );
  }
}
