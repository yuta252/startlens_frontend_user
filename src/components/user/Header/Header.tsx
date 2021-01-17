import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    Link,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

import { selectUser } from '../../../features/user/auth/authUserSlice';
import customStyles from './Header.module.css';


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
    },
    signUpButton: {
        margin: theme.spacing(1,1.5),
        fontWeight: theme.typography.fontWeightBold,
    }
}));


const StyleBadge = withStyles( (theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const Header: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const user = useSelector(selectUser);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem("startlensJWT");
        window.location.href = "/signin";
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className={classes.toolbarTitle}>
                    <div className={customStyles.header_log_wrapper} onClick={() => handleLink('/')}>
                        <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} alt="logo" />
                        <Typography variant="h5" className={classes.title}>
                            Startlens
                        </Typography>
                    </div>
                </div>
                {localStorage.startlensJWT ? (
                    <div>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <StyleBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right"
                                }}
                                variant="dot"
                            >
                                {
                                    user.thumbnailUrl ? (
                                        <Avatar alt="avatar" src={user.thumbnailUrl} />
                                    ) : (
                                        <Avatar alt="avatar" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} />
                                    )
                                }
                            </StyleBadge>
                        </Button>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="プロフィール" />
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="ログアウト" />
                            </MenuItem>
                        </StyledMenu>
                    </div>
                ) : (
                    <div className={customStyles.header_button_wrapper}>
                        <nav>
                            <Link variant="button" href="#" color="textPrimary" className={classes.link}>
                                Startlensとは
                            </Link>
                        </nav>
                        <Button href="./signup" color="primary" variant="outlined" className={classes.signUpButton} disableElevation>
                            新規登録
                        </Button>
                        <Button href="./signin" color="primary" variant="contained" className={classes.button} disableElevation>
                            ログイン
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header
