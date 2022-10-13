export enum APP_ROUTS {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  COURSES = 'courses',
}

export interface User {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
}

export enum ALERT_TEXT {
  MORE_THEN_6_CHARACTERS = 'must be at least 6 characters',
  MORE_THEN_8_CHARACTERS = 'must be at least 8 characters',
}
