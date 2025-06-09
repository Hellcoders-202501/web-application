import type { Trip } from "@models/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import contractsService from "@services/contractsService";
import type { AxiosError } from "axios";

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
