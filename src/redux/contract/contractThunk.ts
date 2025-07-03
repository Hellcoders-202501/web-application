import type { IRootState } from "@core/store";
import type { Application, Trip } from "@models/contract";
import { setAlertDialog } from "@redux/common/commonThunk";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import contractsService from "@services/contractsService";
import type { AxiosError } from "axios";

// Actions

export const clearApplications = createAction("CLEAR_APPLICATIONS");
export const clearTrip = createAction("CLEAR_TRIP");

// Requests

export const makeRequest = createAsyncThunk(
  "CREATE_REQUEST",
  async (
    request: {
      clientId: number;
      serviceId: number;
      trip: Trip;
    },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const response = await contractsService.makeRequest(request);

      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Solicitud realizada!",
            type: "success",
          })
        );
        const state = getState() as IRootState;
        const clientId = state.user.user?.id;
        await dispatch(getRequestsByClientId(clientId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al realizar la solicitud",
          type: "error",
        })
      );
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

export const deleteRequestById = createAsyncThunk(
  "DELETE_REQUEST_BY_ID",
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await contractsService.deleteRequestById(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Solicitud eliminada con exito!",
            type: "success",
          })
        );
        const state = getState() as IRootState;
        const clientId = state.user.user?.id;
        await dispatch(getRequestsByClientId(clientId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al eliminar la solicitud",
          type: "error",
        })
      );
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
  async (application: Application, { rejectWithValue, dispatch }) => {
    try {
      const response = await contractsService.createApplication(application);

      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Oferta realizada con exito!",
            type: "success",
          })
        );
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al realizar la oferta",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getApplicationsByRequestId = createAsyncThunk(
  "GET_APPLICATION_BY_REQUEST_ID",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await contractsService.getApplicationByRequestId(id);

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 404) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "No se encontraron ofertas para la solicitud",
            type: "warning",
          })
        );
      }
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const createContractByApplicationId = createAsyncThunk(
  "CREATE_CONTRACT_BY_APPLICATION_ID",
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await contractsService.createContractByApplicationId(id);

      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Contrato aceptado con exito!",
            type: "success",
          })
        );
        const state = getState() as IRootState;
        const clientId = state.user.user?.id;
        dispatch(clearApplications());
        await dispatch(getRequestsByClientId(clientId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al aceptar la oferta",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const declineApplication = createAsyncThunk(
  "DECLINE_APPLICATION",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await contractsService.declineApplication(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Oferta rechazada con exito!",
            type: "success",
          })
        );
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al rechazar la oferta",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

// Trips

export const getTripById = createAsyncThunk(
  "GET_TRIP_BY_ID",
  async (tripId: number, { rejectWithValue }) => {
    try {
      const response = await contractsService.getTripById(tripId);

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

export const getTripsByDriverId = createAsyncThunk(
  "GET_TRIPS_BY_DRIVER_ID",
  async (driverId: number, { rejectWithValue }) => {
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
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await contractsService.startTripById(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Contrato iniciado con éxito!",
            type: "success",
          })
        );
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;

        await Promise.all([
          dispatch(getTripsByClientId(driverId as number)).unwrap(),
          dispatch(getHistoryTripsByClientId(driverId as number)).unwrap(),
        ]);

        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al iniciar el contrato",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const deleteTripById = createAsyncThunk(
  "DELETE_TRIP_BY_ID",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await contractsService.deleteTripById(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Contrato eliminado con exito!",
            type: "success",
          })
        );
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al eliminar el contrato",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const finishTripByClient = createAsyncThunk(
  "FINISH_TRIP_BY_CLIENT",
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await contractsService.finishTripByClient(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Contrato finalizado con éxito!",
            type: "success",
          })
        );
        const state = getState() as IRootState;
        const clientId = state.user.user?.id;

        // Wait for both dispatch operations to complete before returning
        await Promise.all([
          dispatch(getTripsByClientId(clientId as number)).unwrap(),
          dispatch(getHistoryTripsByClientId(clientId as number)).unwrap(),
        ]);

        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al finalizar el contrato",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const finishTripByDriver = createAsyncThunk(
  "FINISH_TRIP_BY_DRIVER",
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await contractsService.finishTripByDriver(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Contrato marcado como finalizado con éxito!",
            type: "success",
          })
        );
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;

        await Promise.all([
          dispatch(getTripsByClientId(driverId as number)).unwrap(),
          dispatch(getHistoryTripsByClientId(driverId as number)).unwrap(),
        ]);

        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al finalizar el contrato",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);
