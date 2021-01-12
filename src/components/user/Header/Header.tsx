import React, { useState } from 'react';

import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Avatar,
    Button,
    Link,
    Toolbar,
    Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        backgroundColor: "#fff",
        width: '100%',
    },
    toolBar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        paddingLeft: "8px",
    },
    titleLink: {
        textDecoration: 'none',
    },
    link: {
        margin: theme.spacing(1,1.5)
    },
    button: {
        margin: theme.spacing(1,1.5),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    }
}));



const Header: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className={classes.toolbarTitle}>
                    <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} alt="logo" />
                    <Typography variant="h5" className={classes.title}>
                        Startlens
                    </Typography>
                </div>
                <nav>
                    <Link variant="button" href="#" color="textPrimary" className={classes.link}>
                        ログアウト
                    </Link>
                    <Link variant="button" href="#" color="textPrimary" className={classes.link}>
                        ログイン
                    </Link>
                </nav>
                <Button href="./signin" color="primary" variant="contained" className={classes.button} disableElevation>
                    ログイン
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header
