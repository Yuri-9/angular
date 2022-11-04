import { User } from 'src/app/app-model';

export const InitialUser: User = {
  name: 'YRA',
  email: '123@qq.qq',
  password: '1123123123',
};

export enum POPUP_LOGIN_TEXT {
  SUCCESSFUL = 'Registration successful!',
  ERROR = 'A user with this email already exists. Please login or use a different email',
}
