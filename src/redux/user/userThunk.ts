import store, { type IRootState } from "@core/store";
import type {
  CreateBankAccount,
  CreateExperience,
  CreateUser,
  CreateVehicle,
  EditBankAccount,
  Experience,
  ForgotPasswordState,
  LoginState,
  UpdateUser,
  User,
  Vehicle,
} from "@models/user";
import { setAlertDialog } from "@redux/common/commonThunk";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "@services/userService";
import type { AxiosError } from "axios";

export const setToken = createAction<string>("SET_TOKEN");
export const setUserType = createAction<string>("SET_USER_TYPE");
export const setExperiences = createAction<Experience[]>("SET_EXPERIENCES");
export const setVehicles = createAction<Vehicle[]>("SET_VEHICLES");

export const signin = createAsyncThunk(
  "SIGNIN",
  async (payload: LoginState, { rejectWithValue, dispatch }) => {
    try {
      const response = (await userServices.signIn(
        payload.email,
        payload.password
      )) as { token: string };

      if (response?.token) {
        store.dispatch(setToken(response.token));

        window.location.replace("/");
        return response.token;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Usuario o contraseña incorrectos",
            type: "error",
          })
        );
      }
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "FORGOT_PASSWORD",
  async (payload: ForgotPasswordState, { rejectWithValue, dispatch }) => {
    try {
      const response = (await userServices.forgotPassword(
        payload.email,
        payload.newPassword
      )) as { token: string };

      if (response) {
        // window.location.replace("/login");

        dispatch(
          setAlertDialog({
            open: true,
            message: "Contraseña cambiada correctamente",
            type: "success",
          })
        );
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "No se pudo cambiar la contraseña",
            type: "error",
          })
        );
      }
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const signup = createAsyncThunk(
  "SIGNUP",
  async (
    payload: {
      userType: string;
      user: CreateUser;
    },
    { rejectWithValue }
  ) => {
    try {
      if (payload.userType === "CLIENT") {
        const response = (await userServices.registerClient(
          payload.user
        )) as User;
        if (response) {
          return response;
        }
      }
      if (payload.userType === "DRIVER") {
        const response = (await userServices.registerDriver(
          payload.user
        )) as User;
        if (response) {
          return response;
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getCurrentUserById = createAsyncThunk(
  "GET_CURRENT_USER_BY_ID",
  async (payload: { id: number; type: string }, { rejectWithValue }) => {
    try {
      if (payload.type === "DRIVER") {
        const response = (await userServices.getDriverById(payload.id)) as User;
        if (response) {
          return response;
        }
      }
      if (payload.type === "CLIENT") {
        const response = (await userServices.getClientById(payload.id)) as User;
        if (response) {
          return response;
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getClientById = createAsyncThunk(
  "GET_CLIENT_BY_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = (await userServices.getClientById(id)) as User;

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getDriverById = createAsyncThunk(
  "GET_DRIVER_BY_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = (await userServices.getDriverById(id)) as User;

      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  "UPDATE_USER",
  async (
    payload: {
      userInformation: UpdateUser;
      type: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      if (payload.type === "CLIENT") {
        const response = (await userServices.updateClient(
          payload.userInformation
        )) as User;
        if (response) {
          dispatch(
            setAlertDialog({
              open: true,
              message: "Datos actualizados",
              type: "success",
            })
          );
          return response;
        }
      }
      if (payload.type === "DRIVER") {
        const response = (await userServices.updateDriver(
          payload.userInformation
        )) as User;
        if (response) {
          dispatch(
            setAlertDialog({
              open: true,
              message: "Datos actualizados",
              type: "success",
            })
          );
          return response;
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al actualizar datos",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getExperiencesByDriverId = createAsyncThunk(
  "GET_EXPERIENCES_BY_DRIVER_ID",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await userServices.getExperiencesByDriverId(id);
      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        dispatch(setExperiences([]));
      }
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getVehiclesByDriverId = createAsyncThunk(
  "GET_VEHICLES_BY_DRIVER_ID",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await userServices.getVehiclesByDriverId(id);
      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        dispatch(setVehicles([]));
      }
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getCommentsByDriverId = createAsyncThunk(
  "GET_COMMENTS_BY_DRIVER_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await userServices.getCommentsByDriverId(id);
      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getBankAccountByDriverId = createAsyncThunk(
  "GET_BANK_ACCOUNT_BY_DRIVER_ID",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await userServices.getBankAccountByDriverId(id);
      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const addVehicle = createAsyncThunk(
  "ADD_VEHICLE",
  async (
    vehicleInformation: CreateVehicle,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const response = await userServices.addVehicle(vehicleInformation);
      if (response) {
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;
        dispatch(
          setAlertDialog({
            open: true,
            message: "Vehículo añadido correctamente",
            type: "success",
          })
        );
        await dispatch(getVehiclesByDriverId(driverId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al añadir vehículo",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const addExperience = createAsyncThunk(
  "ADD_EXPERIENCE",
  async (
    experienceInformation: CreateExperience,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const response = await userServices.addExperience(experienceInformation);
      if (response) {
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;
        dispatch(
          setAlertDialog({
            open: true,
            message: "Experiencia añadida correctamente",
            type: "success",
          })
        );
        await dispatch(getExperiencesByDriverId(driverId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al añadir experiencia",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

// export const addComment = createAsyncThunk(
//   "ADD_COMMENT",
//   async (commentInformation: CreateComment, { rejectWithValue }) => {
//     try {
//       const response = await userServices.addComment(commentInformation);
//       if (response) {
//         return response;
//       }
//     } catch (error) {
//       const err = error as AxiosError;
//       return rejectWithValue({
//         status: err.response?.status,
//         message: err.response?.data,
//       });
//     }
//   },
// );

export const addBankAccount = createAsyncThunk(
  "ADD_BANK_ACCOUNT",
  async (
    bankAccountInformation: CreateBankAccount,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const response = await userServices.addBankAccount(
        bankAccountInformation
      );
      if (response) {
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;
        dispatch(
          setAlertDialog({
            open: true,
            message: "Cuenta bancaria añadida correctamente",
            type: "success",
          })
        );
        dispatch(getBankAccountByDriverId(driverId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al añadir la cuenta bancaria",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const editBankAccount = createAsyncThunk(
  "EDIT_BANK_ACCOUNT",
  async (
    bankAccountInformation: EditBankAccount,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const response = await userServices.editBankAccount(
        bankAccountInformation
      );
      if (response) {
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;
        dispatch(
          setAlertDialog({
            open: true,
            message: "Cuenta bancaria actualizada correctamente",
            type: "success",
          })
        );
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al actualizar la cuenta bancaria",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const deleteVehicleById = createAsyncThunk(
  "DELETE_VEHICLE_BY_ID",
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await userServices.deleteVehicleById(id);
      if (response) {
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;
        dispatch(
          setAlertDialog({
            open: true,
            message: "Vehículo eliminado correctamente",
            type: "success",
          })
        );
        await dispatch(getVehiclesByDriverId(driverId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al eliminar el vehículo",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const deleteExperienceById = createAsyncThunk(
  "DELETE_EXPERIENCE_BY_ID",
  async (id: number, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await userServices.deleteExperienceById(id);
      if (response) {
        const state = getState() as IRootState;
        const driverId = state.user.user?.id;
        dispatch(
          setAlertDialog({
            open: true,
            message: "Experiencia eliminada correctamente",
            type: "success",
          })
        );
        await dispatch(getExperiencesByDriverId(driverId as number));
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al eliminar experiencia",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const deleteBankAccountById = createAsyncThunk(
  "DELETE_BANK_ACCOUNT_BY_ID",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await userServices.deleteBankAccountById(id);
      if (response) {
        dispatch(
          setAlertDialog({
            open: true,
            message: "Cuenta bancaria eliminada correctamente",
            type: "success",
          })
        );
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        setAlertDialog({
          open: true,
          message: "Error al eliminar la cuenta bancaria",
          type: "error",
        })
      );
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);

export const getMostRankedDrivers = createAsyncThunk(
  "GET_MOST_RANKED_DRIVERS",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.getMostRankedDrivers();
      if (response) {
        return response;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  }
);
