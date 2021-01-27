import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import {
    fetchAsyncGetFavorites,
    fetchAsyncGetNewSpots,
} from './features/user/spot/spotSlice';
import { fetchAsyncGetUserInfo, selectUser } from './features/user/auth/authUserSlice';

import { AppDispatch } from './app/store';
import Router from './routes/Router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import UserHeader from './components/user/Header/Header';
import UserFooter from './components/user/Footer/Footer';

import ja from './locales/ja';
import en from './locales/en';
import { IntlProvider } from 'react-intl';

const chooseLocaleData = (locale: string) => {
    switch (locale) {
        case 'ja':
            return ja
        case 'en':
            return en
        default:
            return en
    }
}

const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        minHeight: '100vh',
        height: 'auto',
        overflow: 'auto',
    },
}));

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const isDisplayedUser: Boolean = !(location.pathname === '/signin' || location.pathname === '/signup');
    const classes = useStyles();

    const selectedUser = useSelector(selectUser);
    const locale = selectedUser.lang;

    useEffect( () => {
        const fetchBootLoader = async () => {
            await dispatch(fetchAsyncGetUserInfo());
            await dispatch(fetchAsyncGetNewSpots(3));
            if (localStorage.startlensJWT) {
                await dispatch(fetchAsyncGetFavorites());
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <IntlProvider locale={locale} messages={chooseLocaleData(locale)} defaultLocale="ja">
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
        </IntlProvider>
    );
}

export default App;

