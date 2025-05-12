export interface RegisterUser extends User {
  password: string;
  passwordConfirmation: string;
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
