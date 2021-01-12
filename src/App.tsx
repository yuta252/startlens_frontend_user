import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import { fetchAsyncGetSpots } from './features/user/spot/spotSlice';

import { AppDispatch } from './app/store';
import Router from './routes/Router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import UserHeader from './components/user/Header/Header';
import UserFooter from './components/user/Footer/Footer';


const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'flex'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGlow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        padding: theme.spacing(4),
    }
}));

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const isDisplayedAdmin: Boolean = !(location.pathname === '/admin/signin' || location.pathname === '/admin/signup');
    const isDisplayedUser: Boolean = !(location.pathname === '/signin' || location.pathname === '/signup');
    const isAdminPath: Boolean = /^\/admin\//.test(location.pathname)
    const classes = useStyles();

    useEffect( () => {
        const fetchBootLoader = async () => {
            await dispatch(fetchAsyncGetSpots({items: 3}))
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <div className={classes.root}>
            {!isAdminPath && isDisplayedUser && <UserHeader />}
            <main className={classes.content}>
                { isDisplayedAdmin && isDisplayedUser &&  <div className={classes.appBarSpacer} /> }
                <Container maxWidth={false} className={classes.container} >
                    <Router />
                </Container>
            </main>
        </div>
    );
}

export default App;

