import type {
  BankAccount,
  Experience,
  IUserReduxState,
  RankedDriver,
  Vehicle,
} from "@models/user";
import { createSlice } from "@reduxjs/toolkit";
import { saveLocalToken } from "@util/storageUtil";
import {
  addBankAccount,
  addExperience,
  addVehicle,
  deleteBankAccountById,
  deleteExperienceById,
  deleteVehicleById,
  editBankAccount,
  getBankAccountByDriverId,
  getCurrentUserById,
  getDriverById,
  getExperiencesByDriverId,
  getMostRankedDrivers,
  getVehiclesByDriverId,
  setExperiences,
  setToken,
  setUserType,
  setVehicles,
  signin,
  signup,
  updateUser,
} from "./userThunk";

const initialState: IUserReduxState = {
  user: undefined,
  token: undefined,
  userType: null,
  experiences: [],
  vehicles: [],
  bankAccount: undefined,
  rankedDrivers: [],
  driver: undefined,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(setToken, (state, action) => {
      saveLocalToken(action.payload);
      state.token = action.payload;
    });
    builder
      .addCase(getCurrentUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCurrentUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentUserById.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(setUserType, (state, action) => {
      state.userType = action.payload;
    });
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        window.location.href = "/login"; // Redireccionar a la página de inicio después del registro
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(getDriverById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDriverById.fulfilled, (state, action) => {
        state.driver = action.payload;
        state.loading = false;
      })
      .addCase(getDriverById.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(setExperiences, (state, action) => {
      state.experiences = action.payload;
    });
    builder.addCase(setVehicles, (state, action) => {
      state.vehicles = action.payload;
    });
    builder
      .addCase(getExperiencesByDriverId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getExperiencesByDriverId.fulfilled, (state, action) => {
        state.experiences = action.payload as Experience[];
        state.loading = false;
      })
      .addCase(getExperiencesByDriverId.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(getVehiclesByDriverId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getVehiclesByDriverId.fulfilled, (state, action) => {
        state.vehicles = action.payload as Vehicle[];
        state.loading = false;
      })
      .addCase(getVehiclesByDriverId.rejected, (state, action) => {
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
    builder
      .addCase(getBankAccountByDriverId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBankAccountByDriverId.fulfilled, (state, action) => {
        state.bankAccount = action.payload as BankAccount;
        state.loading = false;
      })
      .addCase(getBankAccountByDriverId.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(addVehicle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(addExperience.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addExperience.rejected, (state, action) => {
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
    builder
      .addCase(addBankAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addBankAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addBankAccount.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(editBankAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editBankAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editBankAccount.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(deleteVehicleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVehicleById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVehicleById.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(deleteExperienceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExperienceById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExperienceById.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(deleteBankAccountById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBankAccountById.fulfilled, (state) => {
        state.loading = false;
        state.bankAccount = undefined;
      })
      .addCase(deleteBankAccountById.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(getMostRankedDrivers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMostRankedDrivers.fulfilled, (state, action) => {
        state.rankedDrivers = action.payload as RankedDriver[];
        state.loading = false;
      })
      .addCase(getMostRankedDrivers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
