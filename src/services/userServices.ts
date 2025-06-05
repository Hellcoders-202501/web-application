import { requests } from "@core/axiosAgent";

const signIn = (email: string, password: string) => {
  return requests.post("/auth", { email, password });
};

const getClientById = (id: number) => {
  return requests.get(`/clients/${id}`);
};

const getDriverById = (id: number) => {
  return requests.get(`/drivers/${id}`);
};

export default { signIn, getClientById, getDriverById };
