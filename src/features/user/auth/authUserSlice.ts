import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    AUTH_USER_STATE,
    CRED,
    ERROR,
    ERROR_RESPONSE,
    JWT,
    POST_PROFILE,
    USER,
} from "../../types";


export const fetchAsyncLogin = createAsyncThunk(
    "authUser/login",
    async (auth: CRED) => {
        const res = await axios.post<JWT>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/token`,
            { "tourist": auth },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncRegister = createAsyncThunk(
    "authUser/register",
    async (auth: CRED) => {
        const res = await axios.post<USER | ERROR_RESPONSE>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/tourists`,
            { "tourist": auth },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncGetUserInfo = createAsyncThunk(
    "authUser/load",
    async () => {
        const res = await axios.get<USER>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/load`,
            {
                headers: {
                    Authorization: `${localStorage.startlensJWT}`,
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncUpdateProfile = createAsyncThunk(
    "authUser/updateProfile",
    async (profile: POST_PROFILE) => {
        console.log("fetchUpdate", profile)
        const {id, ...postProfile} = profile
        console.log(profile)
        console.log(profile.id)
        const res = await axios.patch<USER>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/tourists/${profile.id}`,
            { "tourist": postProfile },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.startlensJWT}`,
                },
            }
        );
        return res.data
    }
);


const initialState: AUTH_USER_STATE = {
    error: {
        isError: false,
        message: ""
    },
    isLoginView: true,
    isLoading: false,
    user: {
        id: 0,
        email: "",
        username: "",
        thumbnailUrl: "",
        sex: 0,
        birth: 0,
        country: "",
        lang: ""
    },
    editedProfile: {
        id: 0,
        username: "",
        imageFile: "",
        sex: 0,
        birth: 0,
        country: "",
        lang: ""
    }
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
        editProfile(state, action: PayloadAction<POST_PROFILE>) {
            state.editedProfile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncLogin.fulfilled,
            (state, action: PayloadAction<JWT>) => {
                localStorage.setItem("startlensJWT", action.payload.token);
            }
        );
        builder.addCase(
            fetchAsyncRegister.rejected,
            (state) => {
                return {
                    ...state, error: { isError: true, message: "メールアドレスもしくはパスワードに誤りがあります。" }
                }
            }
        );
        builder.addCase(
            fetchAsyncGetUserInfo.fulfilled,
            (state, action: PayloadAction<USER>) => {
                return {
                    ...state,
                    user: action.payload,
                    editedProfile: {...state.editedProfile, id: action.payload.id}
                }
            }
        );
        builder.addCase(
            fetchAsyncUpdateProfile.fulfilled,
            (state, action: PayloadAction<USER>) => {
                return {
                    ...state,
                    user: action.payload
                }
            }
        );
    },
});

export const { toggleMode, showError, toggleLoading, editProfile } = authUserSlice.actions;

export const selectIsLoginView = (state: RootState) => state.authUser.isLoginView;
export const selectError = (state: RootState) => state.authUser.error;
export const selectIsLoading = (state: RootState) => state.authUser.isLoading;
export const selectUser = (state: RootState) => state.authUser.user;
export const selectEditedProfile = (state: RootState) => state.authUser.editedProfile;

export default authUserSlice.reducer;
