import { requests } from "@core/axiosAgent";
import type {
  CreateBankAccount,
  CreateComment,
  CreateExperience,
  CreateUser,
  CreateVehicle,
  EditBankAccount,
  UpdateUser,
} from "@models/user";

const signIn = (email: string, password: string) => {
  return requests.post("/auth", { email, password });
};

const forgotPassword = (email: string, newPassword: string) => {
  return requests.post("/auth/change-password", { email, newPassword });
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

const getExperiencesByDriverId = (driverId: number) => {
  return requests.get(`/drivers/${driverId}/experience/`);
};

const getVehiclesByDriverId = (driverId: number) => {
  return requests.get(`/drivers/${driverId}/vehicle/`);
};

const getCommentsByDriverId = (driverId: number) => {
  return requests.get(`/drivers/${driverId}/comment/`);
};

const addVehicle = (vehicleInformation: CreateVehicle) => {
  return requests.post("/drivers/vehicle", vehicleInformation);
};

const addExperience = (experienceInformation: CreateExperience) => {
  return requests.post("/drivers/experience", experienceInformation);
};

const addComment = (commentInformation: CreateComment) => {
  return requests.post("/trips/add-comment", commentInformation);
};

const deleteVehicleById = (id: number) => {
  return requests.delete(`/drivers/vehicle/${id}`);
};

const deleteExperienceById = (id: number) => {
  return requests.delete(`/drivers/experience/${id}`);
};

const deleteCommentById = (id: number) => {
  return requests.delete(`/drivers/comments/${id}`);
};

const getBankAccountByDriverId = (id: number) => {
  return requests.get(`/bank-account/${id}`);
};

const addBankAccount = (bankAccountInformation: CreateBankAccount) => {
  return requests.post(`/bank-account`, bankAccountInformation);
};

const editBankAccount = (bankAccountInformation: EditBankAccount) => {
  return requests.put(`/bank-account`, bankAccountInformation);
};

const deleteBankAccountById = (id: number) => {
  return requests.delete(`/bank-account/${id}`);
};

const getMostRankedDrivers = () => {
  return requests.get("/drivers/most-ranked");
};

export default {
  signIn,
  forgotPassword,
  registerClient,
  registerDriver,
  getClientById,
  getDriverById,
  updateClient,
  updateDriver,
  getExperiencesByDriverId,
  getVehiclesByDriverId,
  getCommentsByDriverId,
  getBankAccountByDriverId,
  addVehicle,
  addExperience,
  addComment,
  addBankAccount,
  editBankAccount,
  deleteVehicleById,
  deleteExperienceById,
  deleteCommentById,
  deleteBankAccountById,
  getMostRankedDrivers,
};
