import type { INotificationReduxState } from "@models/notification";
import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationsByUserId,
  readNotifications,
} from "./notificationThunk";

const initialState: INotificationReduxState = {
  loading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotificationsByUserId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNotificationsByUserId.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getNotificationsByUserId.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(readNotifications.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(readNotifications.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(readNotifications.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default notificationSlice.reducer;
