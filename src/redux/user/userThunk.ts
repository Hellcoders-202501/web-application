import { LoginState } from "@models/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "@services/userServices";

export const sigin = createAsyncThunk(
    "SIGNIN",
    async (payload: LoginState, { rejectWithValue }) => {
        try {
            const response = await userServices.signIn(payload.email, payload.password);
            // console.log("response", response);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
});
