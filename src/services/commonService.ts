import { requests } from "@core/axiosAgent";

const getServiceTypes = () => {
  return requests.get("/service-type");
};

const getTripStatus = () => {
  return requests.get("/trip-status");
};

const getBankAccountTypes = () => {
  return requests.get(`/bank-account/types`);
};

export default {
  getServiceTypes,
  getTripStatus,
  getBankAccountTypes,
};
