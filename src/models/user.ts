export interface IUserReduxState {
  user: User | undefined;
  token: string | undefined;
  userType: string | null;
  experiences: Experience[] | undefined;
  vehicles: Vehicle[] | undefined;
  comments: Comment[] | undefined;
  bankAccount: BankAccount | undefined;
  rankedDrivers: RankedDriver[] | undefined;
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

export interface CreateVehicle extends VehicleInfo {
  driverId: number;
}

export interface Vehicle extends VehicleInfo {
  id: number;
}

export interface VehicleInfo {
  brand: string;
  imageUrl: string;
  serviceId: number;
}

export interface CreateExperience extends Experience {
  id: number;
}

export interface Experience extends ExperienceInfo {
  id: number;
}

export interface ExperienceInfo {
  job: string;
  duration: number;
}

export interface CreateComment {
  rating: number;
}

export interface Comment {
  id: number;
}

export interface EditBankAccount extends BankAccountInfo {
  id: number;
}

export interface CreateBankAccount extends BankAccountInfo {
  driverId: number;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountTypeId: number;
}

export interface BankAccount {
  id: number;
  bankName: string;
  number: string;
  type: string;
  currency: string;
  createdAt: string;
  transactions: [];
}

export interface RankedDriver {
  id: number;
  name: string;
  firstLastName: string;
  imageUrl: string | null;
  phone: string;
  rating: number;
}
