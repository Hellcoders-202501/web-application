import { requests } from "@core/axiosAgent";
import type { Application, Trip } from "@models/contract";

// Requests

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

// Applications

const createApplication = (application: Application) => {
  return requests.post("/applications", application);
};

const getApplicationByRequestId = (id: number) => {
  return requests.get(`/applications/request/${id}`);
};

const createContractByApplicationId = (id: number) => {
  return requests.postWithoutBody(`/contracts/${id}/create`);
};

// Trips

const getTripsByDriverIdAndStatusId = (driverId: number, statusId: number) => {
  return requests.get(`/trips/driver/${driverId}/status/${statusId}`);
};

const getTripsByClientIdAndStatusId = (clientId: number, statusId: number) => {
  return requests.get(`/trips/client/${clientId}/status/${statusId}`);
};

export default {
  makeRequest,
  getRequestById,
  getRequestsByClientId,
  getRequestsByServiceId,
  createApplication,
  getApplicationByRequestId,
  createContractByApplicationId,
  getTripsByDriverIdAndStatusId,
  getTripsByClientIdAndStatusId,
};
