import type {
  INotification,
  INotificationReduxState,
} from "@models/notification";
import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationsByUserId,
  readNotifications,
  websocketMessage,
} from "./notificationThunk";

const initialState: INotificationReduxState = {
  notifications: [],
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
      state.notifications = action.payload as INotification[];
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
    // web socket
    builder.addCase(websocketMessage, (state, action) => {
      // Update notifications
      state.notifications = [...state.notifications, action.payload as INotification];
    });
  },
});

export default notificationSlice.reducer;
