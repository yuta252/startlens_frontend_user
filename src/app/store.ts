import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authUserReducer from '../features/user/auth/authUserSlice';
import spotReducer from '../features/user/spot/spotSlice';
import exhibitReducer from '../features/user/exhibit/exhibitSlice';


export const store = configureStore({
    reducer: {
        spot: spotReducer,
        authUser: authUserReducer,
        exhibit: exhibitReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;