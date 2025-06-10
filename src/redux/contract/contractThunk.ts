import type { IRootState } from "@core/store";
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
    { rejectWithValue }
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
  }
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
  }
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
  }
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
  }
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
  }
);

export const getApplicationsByRequestId = createAsyncThunk(
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
  }
);

export const createContractByApplicationId = createAsyncThunk(
  "CREATE_CONTRACT_BY_APPLICATION_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.createContractByApplicationId(id);

      if (response) {
        alert("Contrato aceptado con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al aceptar la oferta");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const declineApplication = createAsyncThunk(
  "DECLINE_APPLICATION",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.declineApplication(id);
      if (response) {
        alert("Oferta rechazada con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al rechazar la oferta");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

// Trips

export const getTripsByDriverId = createAsyncThunk(
  "GET_TRIPS_BY_DRIVER_ID",
  async (driverId: number, { rejectWithValue, getState }) => {
    try {
      // const state = getState() as IRootState;
      // const pendingId = state.common.tripStatus.find(
      //   (status) => status.status === "PENDING"
      // )?.id as number;

      const response = await contractsService.getTripsByDriverId(driverId);

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
  }
);

export const getHistoryTripsByDriverId = createAsyncThunk(
  "GET_HISTORY_TRIPS_BY_DRIVER_ID",
  async (driverId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const completedId = state.common.tripStatus.find(
        (status) => status.status === "COMPLETED"
      )?.id as number;

      const response = await contractsService.getTripsByDriverIdAndStatusId(
        driverId,
        completedId
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
  }
);

export const getTripsByClientId = createAsyncThunk(
  "GET_TRIPS_BY_CLIENT_ID",
  async (clientId: number, { rejectWithValue, getState }) => {
    try {
      // const state = getState() as IRootState;
      // const pendingId = state.common.tripStatus.find(
      //   (status) => status.status === "PENDING"
      // )?.id as number;

      const response = await contractsService.getTripsByClientId(clientId);

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
  }
);

export const getHistoryTripsByClientId = createAsyncThunk(
  "GET_HISTORY_TRIPS_BY_CLIENT_ID",
  async (clientId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const completedId = state.common.tripStatus.find(
        (status) => status.status === "COMPLETED"
      )?.id as number;

      const response = await contractsService.getTripsByClientIdAndStatusId(
        clientId,
        completedId
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
  }
);

export const startTripById = createAsyncThunk(
  "START_TRIP_BY_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.startTripById(id);
      if (response) {
        alert("Contrato iniciado con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al iniciar el contrato");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const deleteTripById = createAsyncThunk(
  "DELETE_TRIP_BY_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.deleteTripById(id);
      if (response) {
        alert("Contrato eliminado con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al eliminar el contrato");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const finishTripByClient = createAsyncThunk(
  "FINISH_TRIP_BY_CLIENT",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.finishTripByClient(id);
      if (response) {
        alert("Contrato finalizado con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al finalizar el contrato");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const finishTripByDriver = createAsyncThunk(
  "FINISH_TRIP_BY_DRIVER",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.finishTripByDriver(id);
      if (response) {
        alert("Contrato marcado como finalizado con exito!");
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      alert("Error al finalizar el contrato");
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);
