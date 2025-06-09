import { IContractReduxState } from "@models/contract";
import { createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "./contractThunk";

const initialState: IContractReduxState = {
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
  },
});

export default contractSlice.reducer;
