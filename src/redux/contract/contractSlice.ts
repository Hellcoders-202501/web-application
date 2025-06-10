import type {
  ApplicationResult,
  IContractReduxState,
  RequestResult,
} from "@models/contract";
import { createSlice } from "@reduxjs/toolkit";
import {
  createApplication,
  createContractByApplicationId,
  declineApplication,
  deleteTripById,
  finishTripByClient,
  finishTripByDriver,
  getApplicationsByRequestId,
  getHistoryTripsByClientId,
  getHistoryTripsByDriverId,
  getRequestById,
  getRequestsByClientId,
  getRequestsByServiceId,
  getTripsByClientId,
  getTripsByDriverId,
  makeRequest,
  startTripById,
} from "./contractThunk";

const initialState: IContractReduxState = {
  requestResultList: [],
  requestResult: null,
  tripsList: [],
  pendingTripsList: [],
  historyTripsList: [],
  applicationList: null,
  loading: false,
};

const contractSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeRequest.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(makeRequest.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(makeRequest.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getRequestsByServiceId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRequestsByServiceId.fulfilled, (state, action) => {
      state.loading = false;
      state.requestResultList = Array.isArray(action.payload)
        ? action.payload
        : [];
    });
    builder.addCase(getRequestsByServiceId.rejected, (state, action) => {
      state.loading = false;
      state.requestResultList = [];
    });
    builder.addCase(getRequestById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRequestById.fulfilled, (state, action) => {
      state.loading = false;
      state.requestResult = (action.payload as RequestResult)
        ? (action.payload as RequestResult)
        : null;
    });
    builder.addCase(getRequestById.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getRequestsByClientId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRequestsByClientId.fulfilled, (state, action) => {
      state.loading = false;
      state.requestResultList = Array.isArray(action.payload)
        ? action.payload
        : [];
    });
    builder.addCase(getRequestsByClientId.rejected, (state, action) => {
      state.loading = false;
      state.requestResultList = [];
    });
    builder.addCase(createApplication.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createApplication.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createApplication.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getApplicationsByRequestId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getApplicationsByRequestId.fulfilled, (state, action) => {
      state.loading = false;
      state.applicationList = action.payload as ApplicationResult;
    });
    builder.addCase(getApplicationsByRequestId.rejected, (state, action) => {
      state.loading = false;
      state.applicationList = null;
    });
    builder.addCase(createContractByApplicationId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      createContractByApplicationId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addCase(createContractByApplicationId.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(declineApplication.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(declineApplication.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(declineApplication.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getTripsByDriverId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTripsByDriverId.fulfilled, (state, action) => {
      state.loading = false;
      state.tripsList = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(getTripsByDriverId.rejected, (state, action) => {
      state.loading = false;
      state.tripsList = [];
    });
    builder.addCase(getTripsByClientId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTripsByClientId.fulfilled, (state, action) => {
      state.loading = false;
      state.tripsList = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(getTripsByClientId.rejected, (state) => {
      state.loading = false;
      state.tripsList = [];
    });
    builder.addCase(getHistoryTripsByDriverId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getHistoryTripsByDriverId.fulfilled, (state, action) => {
      state.loading = false;
      state.historyTripsList = Array.isArray(action.payload)
        ? action.payload
        : [];
    });
    builder.addCase(getHistoryTripsByDriverId.rejected, (state, action) => {
      state.loading = false;
      state.historyTripsList = [];
    });
    builder.addCase(getHistoryTripsByClientId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getHistoryTripsByClientId.fulfilled, (state, action) => {
      state.loading = false;
      state.historyTripsList = Array.isArray(action.payload)
        ? action.payload
        : [];
    });
    builder.addCase(getHistoryTripsByClientId.rejected, (state, action) => {
      state.loading = false;
      state.historyTripsList = [];
    });
    builder.addCase(startTripById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(startTripById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(startTripById.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTripById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTripById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTripById.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(finishTripByDriver.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(finishTripByDriver.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(finishTripByDriver.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(finishTripByClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(finishTripByClient.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(finishTripByClient.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default contractSlice.reducer;
