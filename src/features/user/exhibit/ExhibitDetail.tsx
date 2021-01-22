import React from 'react';
import { useSelector } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Container,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';

import {
    selectSelectedExhibit
} from '../exhibit/exhibitSlice';
import { selectUser } from '../auth/authUserSlice';
import commonStyles from '../../../assets/Style.module.css';
import {
    MULTI_EXHIBIT,
    READ_EXHIBIT,
} from '../../types';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(4, 0),
        padding: theme.spacing(4)
    },
    exhibitPictureContent: {
        padding: theme.spacing(0, 1),
        marginBottom: theme.spacing(2)
    },
    exhibitPictureAvatar: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: 'auto',
    },
}));


const ExhibitDetail: React.FC = () => {
    const classes = useStyles();

    const selectedExhibit = useSelector(selectSelectedExhibit);
    const user = useSelector(selectUser);
    const lang = user.lang;

    const selectMultiExhibitByLang = (exhibit: READ_EXHIBIT): MULTI_EXHIBIT => {
        // select language selected by user at first. if not exists, go on default language en and then finally select ja.
        let multiExhibit = exhibit.multiExhibits.filter( (multiExhibit) =>
            multiExhibit.lang === lang
        )
        if (multiExhibit[0]) { return multiExhibit[0] }
        multiExhibit = exhibit.multiExhibits.filter( (multiExhibit) =>
            multiExhibit.lang === 'en'
        )
        if (multiExhibit[0]) { return multiExhibit[0] }
        multiExhibit = exhibit.multiExhibits.filter( (multiExhibit) =>
            multiExhibit.lang === 'ja'
        )
        if (multiExhibit[0]) { return multiExhibit[0] }
        return exhibit.multiExhibits.slice(-1)[0];
    }

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <Typography variant="h4" color="textPrimary">{selectMultiExhibitByLang(selectedExhibit).name}</Typography>
                <div className={commonStyles.spacer__small} />
                <Typography variant="body1" color="textSecondary">{selectMultiExhibitByLang(selectedExhibit).description}</Typography>
                <div className={commonStyles.spacer__small} />
                <Grid container>
                    {selectedExhibit.pictures.map( (picture, index) => (
                        <Grid item key={index} xs={12} md={6} className={classes.exhibitPictureContent}>
                            <Avatar variant="rounded" src={picture.url} className={classes.exhibitPictureAvatar} alt="picture" />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default ExhibitDetail
