import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { truncate } from 'fs';

import { RootState } from '../../../app/store';
import {
    ERROR,
    SPOT,
    SPOT_GET_PARAMS,
    SPOT_PAGINATE_INDEX,
    SPOT_STATE
} from "../../types";


export const fetchAsyncGetSpots = createAsyncThunk(
    "spot/getSpots",
    async (params: SPOT_GET_PARAMS) => {
        let requestUrl = process.env.REACT_APP_API_URL + "/api/v1/tourist/spots"
        let isQuestion = true;

        Object.keys(params).map( (param, index) => {
            if(params[param] && isQuestion) {
                // if match the condition and at only once, add ? as prefix search query
                requestUrl = requestUrl + "?" + param + "=" + params[param];
                isQuestion = false;
            } else if (params[param]){
                // if match the condition and at second time, add & as prefix search query
                requestUrl = requestUrl + "&" + param + "=" + params[param];
            }
        });

        console.log("request url is sent.", requestUrl);
        const res = await axios.get<SPOT_PAGINATE_INDEX>(
            `${requestUrl}`
        );
        return res.data;
    }
);


const initialState: SPOT_STATE = {
    error: {
        isError: false,
        message: ""
    },
    spots: [
        {
            id: 0,
            profile: {
                id: 0,
                userId: 0,
                majorCategory: 0,
                telephone: "",
                companySite: "",
                url: "",
                rating: 0,
            },
            multiProfiles: [
                {
                    id: 0,
                    userId: 0,
                    lang: "",
                    username: "",
                    selfIntro: "",
                    addressPrefecture: "",
                    addressCity: "",
                    addressStreet: "",
                    entranceFee: "",
                    businessHours: "",
                    holiday: ""
                }
            ]
        }
    ],
    params: {
        last: 0,
        page: 0,
        count: 0,
        query: "",
        category: 0,
        prefecture: ""
    },
    selectSpot: {
        id: 0,
        profile: {
            id: 0,
            userId: 0,
            majorCategory: 0,
            telephone: "",
            companySite: "",
            url: "",
            rating: 0,
        },
        multiProfiles: [
            {
                id: 0,
                userId: 0,
                lang: "",
                username: "",
                selfIntro: "",
                addressPrefecture: "",
                addressCity: "",
                addressStreet: "",
                entranceFee: "",
                businessHours: "",
                holiday: ""
            }
        ]
    }
};

export const spotSlice = createSlice({
    name: 'spot',
    initialState,
    reducers: {
        selectSpot(state, action: PayloadAction<SPOT>) {
            state.selectSpot = action.payload;
        },
        showError(state, action: PayloadAction<ERROR>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetSpots.fulfilled,
            (state, action: PayloadAction<SPOT_PAGINATE_INDEX>) => {
                const data: SPOT[] = action.payload.data;
                const meta = action.payload.meta;
                return {
                    ...state,
                    spots: data,
                    params: meta.params
                };
            }
        );
    },
});

export const { selectSpot, showError } = spotSlice.actions;

export const selectError = (state: RootState) => state.spot.error;
export const selectSpots = (state: RootState) => state.spot.spots;
export const selectParams = (state: RootState) => state.spot.params;
export const selectSelectedSpot = (state: RootState) => state.spot.selectSpot;

export default spotSlice.reducer;
