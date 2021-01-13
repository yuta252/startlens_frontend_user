import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    EXHIBIT_STATE,
    MULTI_EXHIBIT,
    READ_EXHIBIT,
} from "../../types";


export const fetchAsyncGetExhibits = createAsyncThunk(
    "exhibit/getExhibits",
    async (spotId: number) => {
        const res = await axios.get<READ_EXHIBIT[]>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/spots/${spotId}`,
        );
        return res.data;
    }
);


export const initialState: EXHIBIT_STATE = {
    error: {
        isError: false,
        message: ""
    },
    exhibits: [
        {
            id: 0,
            pictures: [
                {
                    id: 0,
                    url: ""
                }
            ],
            multiExhibits: [
                {
                    id: 0,
                    exhibitId: 0,
                    lang: "",
                    name: "",
                    description: ""
                }
            ],
        },
    ],
    selectExhibit: {
        id: 0,
        pictures: [
            {
                id: 0,
                url: ""
            }
        ],
        multiExhibits: [
            {
                id: 0,
                exhibitId: 0,
                lang: "",
                name: "",
                description: ""
            }
        ],
    }
};

export const exhibitSlice = createSlice({
    name: 'exhibit',
    initialState,
    reducers: {
        selectExhibit(state, action: PayloadAction<READ_EXHIBIT>) {
            state.selectExhibit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetExhibits.fulfilled,
            (state, action: PayloadAction<READ_EXHIBIT[]>) => {
                return {
                    ...state,
                    exhibits: action.payload,
                };
            }
        );
    },
});

export const { selectExhibit } = exhibitSlice.actions;

export const selectError = (state: RootState) => state.exhibit.error;
export const selectExhibits = (state: RootState) => state.exhibit.exhibits;

export default exhibitSlice.reducer;