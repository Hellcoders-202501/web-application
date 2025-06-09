import { requests } from "@core/axiosAgent";

const getServiceTypes = () => {
  return requests.get("/service-type");
};

export default {
  getServiceTypes,
};
