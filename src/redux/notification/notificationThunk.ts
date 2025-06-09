import { createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "@services/notificationService";
import type { AxiosError } from "axios";

export const getNotificationsByUserId = createAsyncThunk(
  "GET_NOTIFICATIONS_BY_USER_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotificationsByUserId(id);

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

export const readNotifications = createAsyncThunk(
  "READ_NOTIFICATIONS",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await notificationService.readNotifications(id);

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
