import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    CircularProgress,
    Grid,
    Link,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import {
    fetchAsyncLogin,
    selectError,
    selectIsLoading,
    showError,
    toggleLoading
} from './authUserSlice';
import { AppDispatch } from "../../../app/store";
import commonStyles from "../../../assets/Style.module.css";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: 'calc(100vh + 24px)',
        width: '100vw',
        margin: '-24px -24px -24px -24px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background-cover.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
    },
    submit: {
        margin: theme.spacing(3),
        padding: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'none',
    },
    snackbar: {
        width: "93%"
    },
    span: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "teal",
    },
    spanError: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#d8135b",
        marginTop: 10,
        fontSize: "14px"
    },
}));


const SignIn: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signIn = async () => {
        // Validation
        if (credential.email === "" || credential.password === "") {
            dispatch(showError({ isError: true, message: intl.formatMessage({ id: 'signIn.validation.email', defaultMessage: "Email address and password is required" }) }))
            return false
        }
        dispatch(toggleLoading());
        const result = await dispatch(fetchAsyncLogin(credential));;
        if (fetchAsyncLogin.rejected.match(result)) {
            console.log(result)
            dispatch(toggleLoading());
            dispatch(showError({ isError: true, message: intl.formatMessage({ id: 'signIn.validation.serverError', defaultMessage: "Email address or password is wrong" }) }))
            return false
        }
        if (fetchAsyncLogin.fulfilled.match(result)) {
            dispatch(toggleLoading());
            window.location.href = "/";
        }
    };


    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    { isLoading && <CircularProgress /> }
                    <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />
                    <Typography variant="h5" className={classes.title} >
                        <FormattedMessage id="signIn.title" defaultMessage="Sign in" />
                    </Typography>
                    <div className={commonStyles.spacer__medium}></div>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label={intl.formatMessage({ id: 'signIn.mail', defaultMessage: "Email address" })}
                        type="text"
                        name="email"
                        value={credential.email}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <div className={commonStyles.spacer__small} />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label={intl.formatMessage({ id: 'signIn.password', defaultMessage: "Password" })}
                        type="password"
                        name="password"
                        value={credential.password}
                        onChange={handleInputChange}
                    />
                    { error.isError && (<span className={classes.spanError}> {error.message} </span>) }
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        color="primary"
                        className={classes.submit}
                        onClick={signIn}
                    >
                        <FormattedMessage id="signUp.LoginButton" defaultMessage="Sign in" />
                    </Button>
                    <Alert severity="info" className={classes.snackbar}>
                        <AlertTitle><FormattedMessage id="signIn.demoAccount" defaultMessage="Demo account" /></AlertTitle>
                        Email:<strong>test@startlens.com</strong>, Password: <strong>startlens</strong>
                    </Alert>
                    <div className={commonStyles.divider__small} />
                    <Link href="./signup" variant="body2" color="secondary">
                        <FormattedMessage id="signIn.moveSignUp" defaultMessage="Register a new account" />
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
};

export default SignIn