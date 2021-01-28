import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

import { RootState } from '../../../app/store';
import {
    ERROR,
    FAVORITE,
    POST_FAVORITE,
    POST_REVIEW,
    REVIEW,
    SPOT,
    SPOT_GET_PARAMS,
    SPOT_PAGINATE_INDEX,
    SPOT_STATE,
    USER_STATISTICS_PARAMS,
    USER_STATISTICS_RESPONSE
} from "../../types";


export const fetchAsyncGetSpots = createAsyncThunk(
    "spot/getSpots",
    async (params: SPOT_GET_PARAMS) => {
        let requestUrl = process.env.REACT_APP_API_URL + "/api/v1/tourist/spots"
        let isQuestion = true;

        Object.keys(params).map( (param, index) => {
            if(params[param] && isQuestion) {
                // if match the condition at only once, add ? as prefix search query
                requestUrl = requestUrl + "?" + param + "=" + params[param];
                isQuestion = false;
            } else if (params[param]){
                // if match the condition at second times, add & as prefix search query
                requestUrl = requestUrl + "&" + param + "=" + params[param];
            }
        });

        const res = await axios.get<SPOT_PAGINATE_INDEX>(
            `${requestUrl}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.startlensJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncGetNewSpots = createAsyncThunk(
    "spot/getNewSpots",
    async (count: Number) => {
        const res = await axios.get<SPOT_PAGINATE_INDEX>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/spots?items=${count}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.startlensJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateReview = createAsyncThunk(
    "review/createReviews",
    async (review: POST_REVIEW) => {
        const res = await axios.post<REVIEW>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/reviews`,
            { "review": review },
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

export const fetchAsyncDeleteReview = createAsyncThunk(
    "review/deleteReviews",
    async (review: REVIEW) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/reviews/${review.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.startlensJWT}`,
                },
            },
        );
        return review;
    }
);

export const fetchAsyncGetFavorites = createAsyncThunk(
    "favorite/getFavorites",
    async () => {
        const res = await axios.get<SPOT[]>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/favorites`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.startlensJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateFavorite = createAsyncThunk(
    "favorite/createFavorites",
    async (favorite: POST_FAVORITE) => {
        const res = await axios.post<FAVORITE>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/favorites`,
            { "favorite": favorite },
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

export const fetchAsyncDeleteFavorite = createAsyncThunk(
    "favorite/deleteFavorites",
    async (favorite: POST_FAVORITE) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/favorites/${favorite.userId}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.startlensJWT}`,
                },
            },
        );
        return favorite;
    }
);

export const fetchAsyncCreateUserStatistics = createAsyncThunk(
    "userStatistics/createLogs",
    async (userStatistics: USER_STATISTICS_PARAMS) => {
        const res = await axios.post<USER_STATISTICS_RESPONSE>(
            `${process.env.REACT_APP_API_URL}/api/v1/tourist/user_statistics`,
            { "user_statistic": userStatistics },
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


const initialState: SPOT_STATE = {
    error: {
        isError: false,
        message: ""
    },
    spots: [
        {
            id: 0,
            isFavorite: false,
            profile: {
                id: 0,
                userId: 0,
                majorCategory: 0,
                telephone: "",
                companySite: "",
                url: "",
                rating: 0.0,
                ratingCount: 0,
                latitude: null,
                longitude: null,
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
            ],
            reviews: [
                {
                    id: 0,
                    userId: 0,
                    touristId: 0,
                    lang: "",
                    postReview: "",
                    rating: 0.0,
                    createdAt: "",
                    tourist: {
                        id: 0,
                        username: "",
                        thumbnailUrl: ""
                    },
                }
            ]
        }
    ],
    newSpots: [
        {
            id: 0,
            isFavorite: false,
            profile: {
                id: 0,
                userId: 0,
                majorCategory: 0,
                telephone: "",
                companySite: "",
                url: "",
                rating: 0.0,
                ratingCount: 0,
                latitude: null,
                longitude: null,
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
            ],
            reviews: [
                {
                    id: 0,
                    userId: 0,
                    touristId: 0,
                    lang: "",
                    postReview: "",
                    rating: 0.0,
                    createdAt: "",
                    tourist: {
                        id: 0,
                        username: "",
                        thumbnailUrl: ""
                    },
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
        isFavorite: false,
        profile: {
            id: 0,
            userId: 0,
            majorCategory: 0,
            telephone: "",
            companySite: "",
            url: "",
            rating: 0,
            ratingCount: 0,
            latitude: null,
            longitude: null
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
        ],
        reviews: [
            {
                id: 0,
                userId: 0,
                touristId: 0,
                lang: "",
                postReview: "",
                rating: 0.0,
                createdAt: "",
                tourist: {
                    id: 0,
                    username: "",
                    thumbnailUrl: ""
                },
            }
        ]
    },
    favorites: [
        {
            id: 0,
            isFavorite: false,
            profile: {
                id: 0,
                userId: 0,
                majorCategory: 0,
                telephone: "",
                companySite: "",
                url: "",
                rating: 0.0,
                ratingCount: 0,
                latitude: null,
                longitude: null,
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
            ],
            reviews: [
                {
                    id: 0,
                    userId: 0,
                    touristId: 0,
                    lang: "",
                    postReview: "",
                    rating: 0.0,
                    createdAt: "",
                    tourist: {
                        id: 0,
                        username: "",
                        thumbnailUrl: ""
                    },
                }
            ]
        }
    ],
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
        onFavorite(state, action: PayloadAction<SPOT>) {
            state.spots = state.spots.map( (spot) =>
                spot.id === action.payload.id ? { ...spot, isFavorite: true } : spot
            )
            state.newSpots = state.newSpots.map( (spot) =>
                spot.id === action.payload.id ? { ...spot, isFavorite: true } : spot
            )
            state.favorites = state.favorites.map( (spot) =>
                spot.id === action.payload.id ? { ...spot, isFavorite: true } : spot
            )
        },
        offFavorite(state, action: PayloadAction<SPOT>) {
            state.spots = state.spots.map( (spot) =>
                spot.id === action.payload.id ? { ...spot, isFavorite: false } : spot
            )
            state.newSpots = state.newSpots.map( (spot) =>
                spot.id === action.payload.id ? { ...spot, isFavorite: false } : spot
            )
            state.favorites = state.favorites.map( (spot) =>
                spot.id === action.payload.id ? { ...spot, isFavorite: false } : spot
            )
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
        builder.addCase(
            fetchAsyncGetNewSpots.fulfilled,
            (state, action: PayloadAction<SPOT_PAGINATE_INDEX>) => {
                const data: SPOT[] = action.payload.data;
                const meta = action.payload.meta;
                return {
                    ...state,
                    newSpots: data,
                    params: meta.params
                };
            }
        );
        builder.addCase(
            fetchAsyncCreateReview.fulfilled,
            (state, action: PayloadAction<REVIEW>) => {
                return {
                    ...state,
                    spots: state.spots.map( (spot) =>
                        spot.id !== action.payload.userId ? spot : (
                            {...spot, reviews: [action.payload, ...spot.reviews]}
                        )
                    ),
                    selectSpot: {...state.selectSpot, reviews: [action.payload, ...state.selectSpot.reviews]}
                };
            }
        );
        builder.addCase(
            fetchAsyncDeleteReview.fulfilled,
            (state, action: PayloadAction<REVIEW>) => {
                return {
                    ...state,
                    spots: state.spots.map( (spot) =>
                        spot.id !== action.payload.userId ? spot : (
                            {...spot, reviews: spot.reviews.filter( (review) =>
                                review.id !== action.payload.id
                            )}
                        )
                    ),
                    selectSpot: {...state.selectSpot, reviews: state.selectSpot.reviews.filter( (review) =>
                        review.id !== action.payload.id
                    )}
                };
            }
        );
        builder.addCase(
            fetchAsyncGetFavorites.fulfilled,
            (state, action: PayloadAction<SPOT[]>) => {
                return {
                    ...state,
                    favorites: action.payload
                };
            }
        );
        builder.addCase(
            fetchAsyncCreateFavorite.fulfilled,
            (state, action: PayloadAction<FAVORITE>) => {
                // remove duplicated spot between search spots and new spots
                const spot: SPOT[] = state.spots.filter( (spot) => spot.id === action.payload.userId)
                const uniqueSpot: SPOT[] = spot.length === 0 ? state.newSpots.filter( (newSpot) => newSpot.id === action.payload.userId) : spot
                return {
                    ...state,
                    favorites: [...uniqueSpot, ...state.favorites]
                };
            }
        );
        builder.addCase(
            fetchAsyncDeleteFavorite.fulfilled,
            (state, action: PayloadAction<POST_FAVORITE>) => {
                return {
                    ...state,
                    favorites: state.favorites.filter( (spot) =>
                        spot.id !== action.payload.userId
                    )
                };
            }
        );
    },
});

export const { offFavorite, onFavorite, selectSpot, showError } = spotSlice.actions;

export const selectError = (state: RootState) => state.spot.error;
export const selectSpots = (state: RootState) => state.spot.spots;
export const selectNewSpots = (state: RootState) => state.spot.newSpots;
export const selectParams = (state: RootState) => state.spot.params;
export const selectSelectedSpot = (state: RootState) => state.spot.selectSpot;
export const selectFavorites = (state: RootState) => state.spot.favorites;

export default spotSlice.reducer;
