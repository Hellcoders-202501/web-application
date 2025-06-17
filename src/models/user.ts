export interface IUserReduxState {
  user: User | undefined;
  token: string | undefined;
  userType: string | null;
  experiences: Experience[] | undefined;
  vehicles: CreateVehicle[] | undefined;
  // comments: CreateComment[] | undefined;
  rankedDrivers: User[] | undefined;
  loading: boolean;
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

export interface CreateUser {
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateUser {
  id: number;
  name: string;
  firstLastName: string;
  secondLastName: string;
  phone: string;
  description: string;
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

export interface CreateVehicle {
  brand: string;
  imageUrl: string;
  serviceId: number;
  driverId: number;
}

export interface CreateExperience extends Experience {
  id: number;
}

export interface Experience {
  job: string;
  duration: number;
}
