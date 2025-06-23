export interface IUserReduxState {
  user: User | undefined;
  token: string | undefined;
  userType: string | null;
  experiences: Experience[] | undefined;
  vehicles: Vehicle[] | undefined;
  // comments: Comment[] | undefined;
  rankedDrivers: User[] | undefined;
  driver: User | undefined;
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
  userId: number;
}

export interface CreateVehicle extends Vehicle {
  driverId: number;
}

export interface Vehicle {
  brand: string;
  imageUrl: string;
  serviceId: number;
}

export interface CreateExperience extends Experience {
  id: number;
}

export interface Experience {
  job: string;
  duration: number;
}
