import type {
  Experience,
  CreateVehicle,
  IUserReduxState,
  User,
  Vehicle,
} from "@models/user";
import { createSlice } from "@reduxjs/toolkit";
import {
  addExperience,
  addVehicle,
  getCurrentUserById,
  getExperiencesByDriverId,
  getMostRankedDrivers,
  getVehiclesByDriverId,
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
  experiences: [],
  vehicles: [],
  rankedDrivers: [],
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
    builder.addCase(getExperiencesByDriverId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getExperiencesByDriverId.fulfilled, (state, action) => {
      state.experiences = action.payload as Experience[];
      state.loading = false;
    });
    builder.addCase(getExperiencesByDriverId.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getVehiclesByDriverId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getVehiclesByDriverId.fulfilled, (state, action) => {
      state.vehicles = action.payload as Vehicle[];
      state.loading = false;
    });
    builder.addCase(getVehiclesByDriverId.rejected, (state, action) => {
      state.loading = false;
    });
    /* builder.addCase(getCommentsByDriverId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCommentsByDriverId.fulfilled, (state, action) => {
      state.comments = action.payload as CreateComment[];
      state.loading = false;
    });
    builder.addCase(getCommentsByDriverId.rejected, (state, action) => {
      state.loading = false;
    }); */
    builder.addCase(addVehicle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addVehicle.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addVehicle.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addExperience.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addExperience.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addExperience.rejected, (state, action) => {
      state.loading = false;
    });
    /* builder.addCase(addComment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addComment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
    }); */
    builder.addCase(getMostRankedDrivers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMostRankedDrivers.fulfilled, (state, action) => {
      state.rankedDrivers = action.payload as User[];
      state.loading = false;
    });
    builder.addCase(getMostRankedDrivers.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
