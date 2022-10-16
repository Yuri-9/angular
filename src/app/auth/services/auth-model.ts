interface User {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
}

export interface PostResponse {
  successful: boolean;
}

export const InitialUserAdminData: User = {
  name: '',
  email: 'admin@email.com',
  password: 'admin123',
};
