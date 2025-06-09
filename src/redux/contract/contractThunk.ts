import store, { IRootState } from "@core/store";
import type { Application, Trip } from "@models/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import contractsService from "@services/contractsService";
import type { AxiosError } from "axios";

// Requests

export const makeRequest = createAsyncThunk(
  "CREATE_REQUEST",
  async (
    request: {
      clientId: number;
      serviceId: number;
      trip: Trip;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await contractsService.makeRequest(request);

      if (response) {
        alert("Solicitud realizada con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al realizar la solicitud");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getRequestById = createAsyncThunk(
  "GET_REQUEST_BY_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.getRequestById(id);

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getRequestsByClientId = createAsyncThunk(
  "GET_REQUESTS_BY_CLIENT_ID",
  async (clientId: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.getRequestsByClientId(clientId);

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getRequestsByServiceId = createAsyncThunk(
  "GET_REQUESTS_BY_SERVICE_ID",
  async (serviceId: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.getRequestsByServiceId(serviceId);

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

// Applications

export const createApplication = createAsyncThunk(
  "CREATE_APPLICATION",
  async (application: Application, { rejectWithValue }) => {
    try {
      const response = await contractsService.createApplication(application);

      if (response) {
        alert("Oferta realizada con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al realizar la oferta");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getApplicationByRequestId = createAsyncThunk(
  "GET_APPLICATION_BY_REQUEST_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.getApplicationByRequestId(id);

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const createContractByApplicationId = createAsyncThunk(
  "CREATE_CONTRACT_BY_APPLICATION_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.createContractByApplicationId(id);

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

// Trips

export const getPendingTripsByDriverId = createAsyncThunk(
  "GET_PENDING_TRIPS_BY_DRIVER_ID",
  async (driverId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const pendingId = state.common.tripStatus.find(
        (status) => status.status === "PENDING",
      )?.id as number;

      const response = await contractsService.getTripsByDriverIdAndStatusId(
        driverId,
        pendingId,
      );

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getHistoryTripsByDriverId = createAsyncThunk(
  "GET_HISTORY_TRIPS_BY_DRIVER_ID",
  async (driverId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const completedId = state.common.tripStatus.find(
        (status) => status.status === "COMPLETED",
      )?.id as number;

      const response = await contractsService.getTripsByDriverIdAndStatusId(
        driverId,
        completedId,
      );

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getPendingTripsByClientId = createAsyncThunk(
  "GET_PENDING_TRIPS_BY_CLIENT_ID",
  async (clientId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const pendingId = state.common.tripStatus.find(
        (status) => status.status === "PENDING",
      )?.id as number;

      const response = await contractsService.getTripsByClientIdAndStatusId(
        clientId,
        pendingId,
      );

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const getHistoryTripsByClientId = createAsyncThunk(
  "GET_HISTORY_TRIPS_BY_CLIENT_ID",
  async (clientId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const completedId = state.common.tripStatus.find(
        (status) => status.status === "COMPLETED",
      )?.id as number;

      const response = await contractsService.getTripsByClientIdAndStatusId(
        clientId,
        completedId,
      );

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);
