import type { AlertDialog } from "@models/common";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import commonService from "@services/commonService";
import type { AxiosError } from "axios";

export const setAlertDialog = createAction<AlertDialog>("SET_ALERT_DIALOG");

export const getServiceTypes = createAsyncThunk(
  "GET_SERVICE_TYPES",
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonService.getServiceTypes();

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

export const getTripStatus = createAsyncThunk(
  "GET_TRIP_STATUS",
  async (_, { rejectWithValue }) => {
    try {
      const response = await commonService.getTripStatus();

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
