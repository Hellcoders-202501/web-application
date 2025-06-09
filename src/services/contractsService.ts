import { requests } from "@core/axiosAgent";
import type { Trip } from "@models/contract";

const makeRequest = (request: {
  clientId: number;
  serviceId: number;
  trip: Trip;
}) => {
  return requests.post("/request", request);
};

const getRequestById = (id: number) => {
  return requests.get(`/request/${id}`);
};

const getRequestsByClientId = (clientId: number) => {
  return requests.get(`/request/client/${clientId}`);
};

const getRequestsByServiceId = (serviceId: number) => {
  return requests.get(`/request/service/${serviceId}`);
};

export default {
  makeRequest,
  getRequestById,
  getRequestsByClientId,
  getRequestsByServiceId,
};
