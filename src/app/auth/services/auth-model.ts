import { User } from 'src/app/app-model';

export interface PostResponse {
  successful: boolean;
}

export const InitialUserAdminData: User = {
  name: '',
  email: 'admin@email.com',
  password: 'admin123',
};
