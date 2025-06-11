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

const declineApplication = (id: number) => {
  return requests.delete(`/applications/${id}`);
};

// Trips

const getTripsByDriverIdAndStatusId = (driverId: number, statusId: number) => {
  return requests.get(`/trips/driver/${driverId}/status/${statusId}`);
};

const getTripsByDriverId = (driverId: number) => {
  return requests.get(`/trips/driver/${driverId}`);
};

const getTripsByClientIdAndStatusId = (clientId: number, statusId: number) => {
  return requests.get(`/trips/client/${clientId}/status/${statusId}`);
};

const getTripsByClientId = (clientId: number) => {
  return requests.get(`/trips/client/${clientId}`);
};

const startTripById = (id: number) => {
  return requests.postWithoutBody(`/trips/${id}/starts`);
};

const deleteTripById = (id: number) => {
  return requests.delete(`/trips/${id}`);
};

const finishTripByDriver = (id: number) => {
  return requests.postWithoutBody(`/trips/${id}/finish-by-driver`);
};

const finishTripByClient = (id: number) => {
  return requests.postWithoutBody(`/trips/${id}/finish-by-client`);
};

export default {
  makeRequest,
  getRequestById,
  getRequestsByClientId,
  getRequestsByServiceId,
  createApplication,
  getApplicationByRequestId,
  createContractByApplicationId,
  declineApplication,
  getTripsByDriverIdAndStatusId,
  getTripsByDriverId,
  getTripsByClientIdAndStatusId,
  getTripsByClientId,
  startTripById,
  deleteTripById,
  finishTripByDriver,
  finishTripByClient,
};
