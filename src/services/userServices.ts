import { requests } from "@core/axiosAgent";
import type { CreateUser } from "@models/user";

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

export default {
  signIn,
  registerClient,
  registerDriver,
  getClientById,
  getDriverById,
};
