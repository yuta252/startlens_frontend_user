import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    Grid,
    CircularProgress,
    Link,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";

import { AppDispatch } from "../../../app/store";
import {
    fetchAsyncLogin,
    fetchAsyncRegister,
    selectError,
    selectIsLoading,
    showError,
    toggleLoading
} from "./authUserSlice";
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


const SignUp: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const [credential, setCredential] = useState({ email: "", password: "", confirmPassword: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signUp = async () => {
        // Validation
        if (credential.email === "" || credential.password === "") {
            dispatch(showError({ isError: true, message: intl.formatMessage({ id: 'signIn.validation.email', defaultMessage: "Email address and password is required" }) }))
            return false
        }

        if (credential.password !== credential.confirmPassword) {
            dispatch(showError({ isError: true, message: intl.formatMessage({ id: 'signIn.validation.password', defaultMessage: "The confirmation password entered doesn't match" }) }))
            return false
        }

        dispatch(toggleLoading());
        const result = await dispatch(fetchAsyncRegister({ email: credential.email, password: credential.password }));
        if (fetchAsyncRegister.rejected.match(result)) {
            console.log(result)
            dispatch(toggleLoading());
            return false
        }
        if (fetchAsyncRegister.fulfilled.match(result)) {
            dispatch(toggleLoading());
            await dispatch(fetchAsyncLogin({ email: credential.email, password: credential.password }));
            window.location.href = "/profile";
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
                        <FormattedMessage id="signUp.title" defaultMessage="Sign up" />
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
                    <div className={commonStyles.spacer__small} />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label={intl.formatMessage({ id: 'signIn.confirmationPassword', defaultMessage: "Confirmation password" })}
                        type="password"
                        name="confirmPassword"
                        value={credential.confirmPassword}
                        onChange={handleInputChange}
                    />
                    { error.isError && (<span className={classes.spanError}> {error.message} </span>) }
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        color="primary"
                        className={classes.submit}
                        onClick={signUp}
                    >
                        <FormattedMessage id="signUp.registerButton" defaultMessage="Sign in" />
                    </Button>
                    <div className={commonStyles.divider__small} />
                    <Link href="./signin" variant="body2" color="secondary">
                        <FormattedMessage id="signIn.moveSignIn" defaultMessage="Link to Sign in" />
                    </Link>
                </div>
            </Grid>
        </Grid>
    );
};

export default SignUp
