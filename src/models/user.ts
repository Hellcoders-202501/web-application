export interface IUserReduxState {
  user: User | undefined;
}

export interface LoginState {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  firstLastName: string;
  secondLastName: string;
  phone: string;
  password: string;
  userType: string;
  terms: boolean;
  privacy: boolean;
}

export interface User {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  phone: string;
  username: string;
  email: string;
  description: string;
}
