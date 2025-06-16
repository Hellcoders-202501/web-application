import store from "@core/store";
import type { CreateUser, LoginState, User } from "@models/user";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "@services/userService";
import type { AxiosError } from "axios";

export const setToken = createAction<string>("SET_TOKEN");
export const setUserType = createAction<string>("SET_USER_TYPE");

export const signin = createAsyncThunk(
  "SIGNIN",
  async (payload: LoginState, { rejectWithValue }) => {
    try {
      const response = (await userServices.signIn(
        payload.email,
        payload.password,
      )) as { token: string };

      if (response?.token) {
        store.dispatch(setToken(response.token));

        window.location.replace("/");
        return response.token;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 403) {
        alert("Usuario o contraseña incorrectos");
      }
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data,
      });
    }
  },
);

export const signup = createAsyncThunk(
  "SIGNUP",
  async (
    payload: {
      userType: string;
      user: CreateUser;
    },
    { rejectWithValue },
  ) => {
    try {
      if (payload.userType === "CLIENT") {
        const response = (await userServices.registerClient(
          payload.user,
        )) as User;
        if (response) {
          return response;
        }
      }
      if (payload.userType === "DRIVER") {
        const response = (await userServices.registerDriver(
          payload.user,
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
  },
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
  },
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
  },
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
  },
);
