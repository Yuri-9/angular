export enum APP_ROUTS {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  COURSES = 'courses',
}

export interface User {
  name?: string;
  email?: string;
  password?: string;
  accessToken?: string;
  role?: string;
}
export interface Author {
  id?: string;
  name: string;
}

export enum ALERT_TEXT {
  MORE_THEN_3_CHARACTERS = 'must be at least 3 characters',
  MORE_THEN_8_CHARACTERS = 'must be at least 8 characters',
}

export interface ResponseGet<T> {
  successful: boolean;
  result: T;
}
