import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";

import {
    Button,
    Container,
    Grid,
    Typography
} from '@material-ui/core';

import customStyles from './About.module.css';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginBottom: theme.spacing(1)
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'none',
    },
    subTitle: {
        marginTop: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'none',
    },
    strengthContent: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(4)
    },
    strengthDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    strengthTitle: {
        marginTop: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    },
    strengthSubtitle: {
        marginTop: theme.spacing(3),
        width: '80%'
    },
    strengthContentImage: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center'
    },
    imageSearch: {
        width: '250px',
        height: '200px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/about_search.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageSpot: {
        width: '250px',
        height: '200px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/about_spot.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageAnalysis: {
        width: '250px',
        height: '200px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/about_analysis.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    topButton: {
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(1, 2),
        textTransform: 'none',
    },
    adminButton: {
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(1, 2),
        marginLeft: '16px',
        textTransform: 'none',
    },
}));

const About: React.FC = () => {
    const classes = useStyles();

    const history = useHistory();
    const handleLink = (path: string) => history.push(path);

    const moveToTopAction = () => {
        handleLink('/');
    }

    return (
        <Container maxWidth="md">
            <div className={customStyles.about_page_wrapper}>
                <div className={customStyles.about_top_wrapper}>
                    <div className={customStyles.about_title}>
                        <Typography variant="h4" className={classes.title} color="textPrimary">
                            <FormattedMessage id="about.title" defaultMessage="What's Startlens?"/>
                        </Typography>
                    </div>
                    <Typography variant="h6" className={classes.subTitle} color="textSecondary">
                        <FormattedMessage id="about.subTitle" defaultMessage="A travel site that provides a new form of travel to start online"/>
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subTitle} color="textSecondary">
                        <FormattedMessage id="about.description" defaultMessage='Startlens is based on the concept of "traveling online", and you can search for sightseeing spots from your home at any time and enjoy sightseeing. While the tourism industry around the country is affected by the coronavirus, this site was created with the desire to have "After Corona" visit actual tourist destinations.'/>
                    </Typography>
                </div>
                <div className={customStyles.about_strength_wrapper}>
                    <div className={customStyles.about_title}>
                        <Typography variant="h4" className={classes.title} color="textPrimary">
                            <FormattedMessage id="about.strength.title" defaultMessage="What you can do with this site"/>
                        </Typography>
                    </div>
                    <Grid container className={classes.strengthContent}>
                        <Grid item xs={12} sm={7} className={classes.strengthDescription}>
                            <Typography variant="h6" className={classes.strengthTitle} color="textPrimary">
                                <FormattedMessage id="about.strength.search.title" defaultMessage="Search for sightseeing spots all over the country"/>
                            </Typography>
                            <Typography variant="subtitle1" className={classes.strengthSubtitle} color="textSecondary">
                                <FormattedMessage id="about.strength.search.desc" defaultMessage="You can search for sightseeing spots by spot name, location and category. Let's register your favorite spots as favorites"/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes.strengthContentImage}>
                            <div className={classes.imageSearch}></div>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.strengthContent}>
                        <Grid item xs={12} sm={5} className={classes.strengthContentImage}>
                            <div className={classes.imageSpot}></div>
                        </Grid>
                        <Grid item xs={12} sm={7} className={classes.strengthDescription}>
                            <Typography variant="h6" className={classes.strengthTitle} color="textPrimary">
                                <FormattedMessage id="about.strength.spot.title" defaultMessage="Browse recommended spots in sightseeing"/>
                            </Typography>
                            <Typography variant="subtitle1" className={classes.strengthSubtitle} color="textSecondary">
                                <FormattedMessage id="about.strength.spot.desc" defaultMessage="You can see the recommended spots and also post ratings and reviews"/>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.strengthContent}>
                        <Grid item xs={12} sm={7} className={classes.strengthDescription}>
                            <Typography variant="h6" className={classes.strengthTitle} color="textPrimary">
                                <FormattedMessage id="about.strength.analysis.title" defaultMessage="Resister as a sightseeing spot"/>
                            </Typography>
                            <Typography variant="subtitle1" className={classes.strengthSubtitle} color="textSecondary">
                                <FormattedMessage id="about.strength.analysis.desc" defaultMessage="You can upload images and explanations if you register as sightseeing spot. Visitor's data is visualized for each visitor attribute and can be used for data analysis such as marketing"/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes.strengthContentImage}>
                            <div className={classes.imageAnalysis}></div>
                        </Grid>
                    </Grid>
                </div>
                <div className={customStyles.about_button_wrapper}>
                    <div>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.topButton}
                            onClick={moveToTopAction}
                            disableElevation
                        >
                            <FormattedMessage id="about.button.top" defaultMessage="Top page"/>
                        </Button>
                        <a href={process.env.REACT_APP_ADMIN_URL} className={customStyles.about_admin_button}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.adminButton}
                                disableElevation
                            >
                                <FormattedMessage id="about.button.admin" defaultMessage="Register as sightseeing spot"/>
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default About
