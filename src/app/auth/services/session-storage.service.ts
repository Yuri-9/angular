import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setToken(token: string): void {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    const token = JSON.parse(sessionStorage.getItem('token') || '{}');
    return token;
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }
}
