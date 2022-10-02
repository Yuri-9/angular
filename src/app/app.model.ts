export enum APP_ROUTS {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  COURSES = 'courses',
}

export interface User {
  name: string;
  email: string;
  password: string;
}
