import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    ButtonBase,
    Chip,
    Grid,
    Link,
    Paper,
    Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { AppDispatch } from '../../../app/store';
import {
    selectSpots
} from './spotSlice';
import { majorCategoryChipObj } from '../../../app/constant';
import customStyles from './Top.module.css';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginBottom: theme.spacing(1)
    },
    image: {
        width: '100%',
        height: '100%'
    },
    img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '5px'
    },
    spotContent: {
        padding: theme.spacing(2, 3),
    },
    spotTitle: {
        fontWeight: theme.typography.fontWeightBold,
    },
    rating: {
        marginLeft: theme.spacing(1)
    },
    ratingLabel: {
        marginLeft: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    },
}));


const SpotCard: React.FC = () => {
    const classes = useStyles();

    const [like, setLike] = useState(false);

    const spots = useSelector(selectSpots);

    const displaySpotAction = () => {
        console.log("spot is clicked")
    }

    const likeClickAction = () => {
        console.log("like is clicked")
        setLike(!like)
    }

    return (
        <>
            {spots.map( (spot, index) => (
                <Paper key={index} className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <ButtonBase className={classes.image} onClick={ () => displaySpotAction()}>
                                { spot.profile.url ?
                                    (<img className={classes.img} alt="spotImage" src={spot.profile.url} />)
                                    : (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.img} alt="logo" />)
                                }
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm={9} className={classes.spotContent}>
                            <Link onClick={ () => displaySpotAction()} color="textSecondary">
                                <Typography variant="h6" className={classes.spotTitle}>{ spot.multiProfiles.slice(-1)[0].username}</Typography>
                            </Link>
                            <div className={customStyles.spot_subtitle_wrapper}>
                                <Chip label={`${majorCategoryChipObj[spot.profile.majorCategory]}`} variant="outlined" size="small"/>
                                <Rating className={classes.rating} value={spot.profile.rating} precision={0.5} readOnly />
                                <Typography className={classes.ratingLabel} variant="h6" color="primary">{spot.profile.rating}</Typography>
                            </div>
                            <Typography variant="body1" color="textSecondary">{spot.multiProfiles.slice(-1)[0].addressPrefecture + spot.multiProfiles.slice(-1)[0].addressCity + spot.multiProfiles.slice(-1)[0].addressStreet}</Typography>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className={customStyles.spot_table_head}><Typography variant="body2" color="textSecondary"><strong>料金</strong></Typography></th>
                                            <td><Typography variant="body2" color="textSecondary">{spot.multiProfiles.slice(-1)[0].entranceFee}</Typography></td>
                                        </tr>
                                        <tr>
                                        <th className={customStyles.spot_table_head}><Typography variant="body2" color="textSecondary"><strong>営業時間</strong></Typography></th>
                                            <td><Typography variant="body2" color="textSecondary">{spot.multiProfiles.slice(-1)[0].businessHours}</Typography></td>
                                        </tr>
                                        <tr>
                                        <th className={customStyles.spot_table_head}><Typography variant="body2" color="textSecondary"><strong>休日</strong></Typography></th>
                                            <td><Typography variant="body2" color="textSecondary">{spot.multiProfiles.slice(-1)[0].holiday}</Typography></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={customStyles.like_btn_wrapper}>
                                <div onClick={ () => likeClickAction()}>
                                    {like ? <ThumbUpIcon color="error"/> : <ThumbUpIcon color="disabled"/>}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </>
    )
}

export default SpotCard
