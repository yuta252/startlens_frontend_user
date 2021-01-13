import React from 'react';
import { useDispatch, useSelector } from "react-redux";

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
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Exhibit.module.css';


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

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <Typography variant="h4" color="textPrimary">{selectedExhibit.multiExhibits.slice(-1)[0].name}</Typography>
                <div className={commonStyles.spacer__small} />
                <Typography variant="body1" color="textSecondary">{selectedExhibit.multiExhibits.slice(-1)[0].description}</Typography>
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
