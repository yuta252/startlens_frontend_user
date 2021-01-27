import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    ButtonBase,
    Chip,
    Container,
    Grid,
    Link,
    Paper,
    Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { AppDispatch } from '../../../app/store';
import {
    fetchAsyncCreateFavorite,
    fetchAsyncDeleteFavorite,
    offFavorite,
    onFavorite,
    selectFavorites,
    selectSpot
} from './spotSlice';
import {
    selectUser
} from '../auth/authUserSlice';
import {
    SPOT,
    SPOT_MULTI_PROFILE
} from '../../types';
import { majorCategoryChipItem } from '../../../app/constant';
import customStyles from './Top.module.css';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginBottom: theme.spacing(1)
    },
    title: {
        textTransform: 'none',
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


const FavoriteList: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const history = useHistory();
    const dispatch: AppDispatch = useDispatch();
    const handleLink = (path: string) => history.push(path);

    const spots = useSelector(selectFavorites);
    const user = useSelector(selectUser);
    const lang = user.lang;

    const selectMultiProfileByLang = (spot: SPOT): SPOT_MULTI_PROFILE => {
        // select language selected by user at first. if not exists, go on default language en and then finally select ja.
        let multiProfile = spot.multiProfiles.filter( (multiProfile) =>
            multiProfile.lang === lang
        )
        if (multiProfile[0]) { return multiProfile[0] }
        multiProfile = spot.multiProfiles.filter( (multiProfile) =>
            multiProfile.lang === 'en'
        )
        if (multiProfile[0]) { return multiProfile[0] }
        multiProfile = spot.multiProfiles.filter( (multiProfile) =>
            multiProfile.lang === 'ja'
        )
        if (multiProfile[0]) { return multiProfile[0] }
        return spot.multiProfiles.slice(-1)[0];
    }

    const getMajorCategoryID = (spot: SPOT): string => {
        const majorCategory = spot.profile.majorCategory;
        for (let i = 0; i < majorCategoryChipItem.length - 1; i++) {
            if (majorCategoryChipItem[i].key === majorCategory) {
                return majorCategoryChipItem[i].id
            }
        }
        return 'category.unselected'
    }

    const displaySpotAction = (spot: SPOT) => {
        dispatch(selectSpot(spot));
        handleLink('/spots/detail');
    }

    const favoriteClickAction = async (spot: SPOT) => {
        if (spot.isFavorite) {
            await dispatch(fetchAsyncDeleteFavorite({ userId: spot.id }))
            dispatch(offFavorite(spot));
        } else {
            await dispatch(fetchAsyncCreateFavorite({ userId: spot.id }))
            dispatch(onFavorite(spot));
        }
        console.log("like is clicked")
    }

    return (
        <Container maxWidth="md">
            <div className={customStyles.category_content_wrapper}>
                <Typography variant="h6" className={classes.title}><FormattedMessage id="favorite.title" defaultMessage="Favorite" /></Typography>
                {spots.length !== 0 ? (
                    <div className={customStyles.new_spot_wrapper}>
                        {spots.map( (spot, index) => (
                            <Paper key={index} className={classes.paper}>
                                <Grid container>
                                    <Grid item xs={12} sm={3}>
                                        <ButtonBase className={classes.image} onClick={ () => displaySpotAction(spot)}>
                                            { spot.profile.url ?
                                                (<img className={classes.img} alt="spotImage" src={spot.profile.url} />)
                                                : (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.img} alt="logo" />)
                                            }
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm={9} className={classes.spotContent}>
                                        <Link onClick={ () => displaySpotAction(spot)} color="textSecondary">
                                            <Typography variant="h6" className={classes.spotTitle}>{ selectMultiProfileByLang(spot).username}</Typography>
                                        </Link>
                                        <div className={customStyles.spot_subtitle_wrapper}>
                                            <Chip label={intl.formatMessage({ id: getMajorCategoryID(spot), defaultMessage: "Unselected" })} variant="outlined" size="small"/>
                                            <Rating className={classes.rating} value={spot.profile.rating} precision={0.5} readOnly />
                                            <Typography className={classes.ratingLabel} variant="h6" color="primary">{spot.profile.rating}</Typography>
                                        </div>
                                        <Typography variant="body1" color="textSecondary">{selectMultiProfileByLang(spot).addressPrefecture + ' ' + selectMultiProfileByLang(spot).addressCity + selectMultiProfileByLang(spot).addressStreet}</Typography>
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th className={customStyles.spot_table_head}><Typography variant="body2" color="textSecondary"><strong><FormattedMessage id="spot.card.entranceFee" defaultMessage="Entrance fee" /></strong></Typography></th>
                                                        <td><Typography variant="body2" color="textSecondary">{selectMultiProfileByLang(spot).entranceFee}</Typography></td>
                                                    </tr>
                                                    <tr>
                                                    <th className={customStyles.spot_table_head}><Typography variant="body2" color="textSecondary"><strong><FormattedMessage id="spot.card.businessHour" defaultMessage="Business hour" /></strong></Typography></th>
                                                        <td><Typography variant="body2" color="textSecondary">{selectMultiProfileByLang(spot).businessHours}</Typography></td>
                                                    </tr>
                                                    <tr>
                                                    <th className={customStyles.spot_table_head}><Typography variant="body2" color="textSecondary"><strong><FormattedMessage id="spot.card.holiday" defaultMessage="Holiday" /></strong></Typography></th>
                                                        <td><Typography variant="body2" color="textSecondary">{selectMultiProfileByLang(spot).holiday}</Typography></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={customStyles.like_btn_wrapper}>
                                            <div onClick={ () => favoriteClickAction(spot)}>
                                                {localStorage.startlensJWT && (spot.isFavorite ? <ThumbUpIcon color="error"/> : <ThumbUpIcon color="disabled"/>)}
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </div>
                ) : (
                    <div className={customStyles.favorite_no_content_wrapper}>
                        <Typography variant="body2" color="textSecondary">
                            <FormattedMessage id="favorite.noContent" defaultMessage="No favorite. Let's add to favorites" />
                        </Typography>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default FavoriteList
