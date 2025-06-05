import type { IUserReduxState } from "@models/user";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserById, setToken, setUserType, signin } from "./userThunk";
import { saveLocalToken } from "@util/storageUtil";

const initialState: IUserReduxState = {
  user: undefined,
  token: undefined,
  userType: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      console.log("auth successfully");
      state.loading = false;
    });
    builder.addCase(signin.rejected, (state, action) => {
      console.log("auth failed");
      state.loading = false;
    });
    builder.addCase(setToken, (state, action) => {
      saveLocalToken(action.payload);
      state.token = action.payload;
    });
    builder.addCase(getCurrentUserById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUserById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getCurrentUserById.rejected, (state, action) => {
      console.log("getCurrentUserById failed");
      state.loading = false;
    });
    builder.addCase(setUserType, (state, action) => {
      state.userType = action.payload;
    });
  },
});

export default userSlice.reducer;
