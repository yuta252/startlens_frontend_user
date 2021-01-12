import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authUserReducer from '../features/user/auth/authUserSlice';
import spotReducer from '../features/user/spot/spotSlice';


export const store = configureStore({
    reducer: {
        spot: spotReducer,
        authUser: authUserReducer,
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