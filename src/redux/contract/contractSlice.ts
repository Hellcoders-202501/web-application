import type { IContractReduxState } from "@models/contract";
import { createSlice } from "@reduxjs/toolkit";
import {
  getRequestById,
  getRequestsByServiceId,
  makeRequest,
} from "./contractThunk";

const initialState: IContractReduxState = {
  requestResultList: [],
  requestResult: null,
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
      state.requestResult = action.payload ? action.payload : null;
    });
    builder.addCase(getRequestById.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default contractSlice.reducer;
