import type { ICommonReduxState } from "@models/common";
import { createSlice } from "@reduxjs/toolkit";
import {
  getBankAccountTypes,
  getServiceTypes,
  getTripStatus,
  setAlertDialog,
} from "./commonThunk";

const initialState: ICommonReduxState = {
  serviceTypes: [],
  tripStatus: [],
  bankAccountTypes: [],
  alertDialog: {
    open: false,
    type: "info",
    message: "",
  },
  loading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServiceTypes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getServiceTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceTypes = action.payload as [];
    });
    builder.addCase(getServiceTypes.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getTripStatus.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTripStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.tripStatus = action.payload as [];
    });
    builder.addCase(getTripStatus.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBankAccountTypes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBankAccountTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.bankAccountTypes = action.payload as [];
    });
    builder.addCase(getBankAccountTypes.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(setAlertDialog, (state, action) => {
      state.alertDialog = action.payload;
    });
  },
});

export default commonSlice.reducer;
