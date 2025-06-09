import { RequestContract } from "@models/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import contractsService from "@services/contractsService";
import { AxiosError } from "axios";

export const makeRequest = createAsyncThunk(
  "CREATE_REQUEST",
  async (request: RequestContract, { rejectWithValue }) => {
    try {
      const response = (await contractsService.makeRequest(request));

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