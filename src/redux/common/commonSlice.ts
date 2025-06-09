import { ICommonReduxState } from "@models/common";
import { createSlice } from "@reduxjs/toolkit";
import { getServiceTypes } from "./commonThunk";

const initialState: ICommonReduxState = {
  serviceTypes: [],
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
  },
});

export default commonSlice.reducer;
