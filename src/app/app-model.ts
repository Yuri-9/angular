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

export interface SuccessfulRequest<T> {
  successful: true;
  result: T;
}

export interface FailedRequest {
  successful: false;
  message?: string;
  errors?: string[];
}
