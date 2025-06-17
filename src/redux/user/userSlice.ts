import type { IUserReduxState } from "@models/user";
import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserById,
  setToken,
  setUserType,
  signin,
  signup,
  updateUser,
} from "./userThunk";
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
      state.loading = false;
    });
    builder.addCase(signin.rejected, (state, action) => {
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
      state.loading = false;
    });
    builder.addCase(setUserType, (state, action) => {
      state.userType = action.payload;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      window.location.href = "/login"; // Redireccionar a la página de inicio después del registro
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
