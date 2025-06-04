import { IUserReduxState } from "@models/user";
import { createSlice } from "@reduxjs/toolkit";
import { sigin } from "./userThunk";

const initialState: IUserReduxState = {
    user: undefined,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sigin.pending, (state, action) => {
            // console.log(action.payload);
        });
        builder.addCase(sigin.fulfilled, (state, action) => {
            console.log("auth successfully");
            // console.log(action.payload);
        });
        builder.addCase(sigin.rejected, (state, action) => {
            console.log("auth failed");
            // console.log(action.payload);
        });
    }
});

export default userSlice.reducer;
