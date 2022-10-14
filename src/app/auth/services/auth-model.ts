interface User {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
}

export interface PostResponse {
  successful: boolean;
}
