import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    ERROR,
    AUTH_USER_STATE,
} from "../../types";


const initialState: AUTH_USER_STATE = {
    error: {
        isError: false,
        message: ""
    },
    isLoginView: true,
    isLoading: false,
};

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        toggleMode(state) {
            state.isLoginView = !state.isLoginView;
        },
        showError(state, action: PayloadAction<ERROR>) {
            state.error = action.payload;
        },
        toggleLoading(state) {
            state.isLoading = !state.isLoading;
        },
    },
    extraReducers: (builder) => {
    },
});

export const { toggleMode, showError, toggleLoading } = authUserSlice.actions;

export const selectIsLoginView = (state: RootState) => state.authUser.isLoginView;
export const selectError = (state: RootState) => state.authUser.error;
export const selectIsLoading = (state: RootState) => state.authUser.isLoading;

export default authUserSlice.reducer;
