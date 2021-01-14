import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import {
    fetchAsyncGetSpots
} from './features/user/spot/spotSlice';
import { fetchAsyncGetUserInfo } from './features/user/auth/authUserSlice';

import { AppDispatch } from './app/store';
import Router from './routes/Router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import UserHeader from './components/user/Header/Header';
import UserFooter from './components/user/Footer/Footer';


const useStyles = makeStyles( (theme) => ({
    root: {
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        height: '100vh',
        overflow: 'auto',
    },
}));

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const isDisplayedUser: Boolean = !(location.pathname === '/signin' || location.pathname === '/signup');
    const classes = useStyles();

    useEffect( () => {
        const fetchBootLoader = async () => {
            if (localStorage.localJWT) {
                await dispatch(fetchAsyncGetUserInfo())
                await dispatch(fetchAsyncGetSpots({items: 3}))
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <div className={classes.root}>
            {isDisplayedUser && <UserHeader />}
            <main className={classes.content}>
                { isDisplayedUser &&  <div className={classes.appBarSpacer} /> }
                <Container maxWidth={false}>
                    <Router />
                </Container>
            </main>
            {isDisplayedUser && <UserFooter />}
        </div>
    );
}

export default App;

