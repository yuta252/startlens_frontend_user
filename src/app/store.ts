import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import authUserReducer from '../features/user/auth/authUserSlice';
import spotReducer from '../features/user/spot/spotSlice';
import exhibitReducer from '../features/user/exhibit/exhibitSlice';


export const store = configureStore({
    reducer: {
        spot: spotReducer,
        authUser: authUserReducer,
        exhibit: exhibitReducer,
    },
    preloadedState: load(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppDispatch = typeof store.dispatch;