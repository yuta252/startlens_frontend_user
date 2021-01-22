import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';

import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Rating } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { AppDispatch } from '../../../app/store';
import {
    fetchAsyncDeleteReview,
    selectSelectedSpot
} from './spotSlice';
import { selectUser } from '../auth/authUserSlice';
import customStyles from './Top.module.css';
import { REVIEW } from '../../types';


const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    ratingLabel: {
        marginLeft: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    },
    deleteButton: {
        textTransform: 'none',
    }
}))


const ReviewList: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const selectedSpot = useSelector(selectSelectedSpot);
    const user = useSelector(selectUser);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dateFormatter = (dateIso8601: string) => {
        const date = new Date(dateIso8601);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return year + "/" + month + "/" + day + " " + hour + ":" + minutes
    }

    const deleteReviewAction = async (review: REVIEW) => {
        const result = await dispatch(fetchAsyncDeleteReview(review));
        handleClose()
        if (fetchAsyncDeleteReview.rejected.match(result)) {
            console.log("failed to delete review");
            return false
        }
        if (fetchAsyncDeleteReview.fulfilled.match(result)) {
            console.log("success to delete review");
        }
    }

    return (
        <div>
            {selectedSpot.reviews.map( (review, index) => (
                <Card key={index}>
                    <CardHeader
                        avatar={
                            review.tourist.thumbnailUrl ?
                            (
                                <Avatar aria-label="review-owner" src={review.tourist.thumbnailUrl} className={classes.avatar} />
                            ) : (
                                (<Avatar src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="review-owner" />)
                            )
                        }
                        action={
                            (review.touristId === user.id) && (
                                <div>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem
                                            onClick={() => deleteReviewAction(review)}
                                            className={classes.deleteButton}
                                        >
                                            <FormattedMessage id="button.delete" defaultMessage="Delete" />
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )
                        }
                        title={review.tourist.username}
                        subheader={dateFormatter(review.createdAt)}
                    />
                    <CardContent>
                        <div className={customStyles.spot_subtitle_wrapper}>
                            <Rating value={review.rating} precision={0.5} readOnly />
                            <Typography className={classes.ratingLabel} variant="h6" color="primary">{review.rating}</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {review.postReview}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default ReviewList
