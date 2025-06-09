import { requests } from "@core/axiosAgent";
import type { Trip } from "@models/contract";

const makeRequest = (request: {
  clientId: number;
  serviceId: number;
  trip: Trip;
}) => {
  return requests.post("/request", request);
};

export default {
  makeRequest,
};
