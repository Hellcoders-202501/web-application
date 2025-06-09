import { requests } from "@core/axiosAgent";

const getServiceTypes = () => {
  return requests.get("/service-type");
};

const getTripStatus = () => {
  return requests.get("/trip-status");
};

export default {
  getServiceTypes,
  getTripStatus,
};
