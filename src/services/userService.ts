import { requests } from "@core/axiosAgent";
import type { CreateUser, UpdateUser } from "@models/user";

const signIn = (email: string, password: string) => {
  return requests.post("/auth", { email, password });
};

const registerClient = (user: CreateUser) => {
  return requests.post("/clients", user);
};

const registerDriver = (user: CreateUser) => {
  return requests.post("/drivers", user);
};

const getClientById = (id: number) => {
  return requests.get(`/clients/${id}`);
};

const getDriverById = (id: number) => {
  return requests.get(`/drivers/${id}`);
};

const updateDriver = (userInformation: UpdateUser) => {
  return requests.put("/drivers", userInformation);
};

const updateClient = (userInformation: UpdateUser) => {
  return requests.put("/clients", userInformation);
};

export default {
  signIn,
  registerClient,
  registerDriver,
  getClientById,
  getDriverById,
  updateClient,
  updateDriver,
};
