import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    ButtonBase,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Rating } from '@material-ui/lab';

import { AppDispatch } from '../../../app/store';
import {
    fetchAsyncCreateReview,
    selectSelectedSpot
} from './spotSlice';
import { selectUser } from '../auth/authUserSlice';
import {
    fetchAsyncGetExhibits,
    selectExhibit,
    selectExhibits,
} from '../exhibit/exhibitSlice';
import {
    fetchAsyncCreateUserStatistics
} from './spotSlice';
import GoogleMapComponent from './GoogleMapComponent';
import ReviewList from './ReviewList';
import { majorCategoryChipItem } from '../../../app/constant';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Top.module.css';
import {
    MULTI_EXHIBIT,
    POST_REVIEW,
    READ_EXHIBIT,
    SPOT,
    SPOT_MULTI_PROFILE
} from '../../types';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(4, 0),
        padding: theme.spacing(4)
    },
    rating: {
        marginLeft: theme.spacing(1)
    },
    ratingLabel: {
        marginLeft: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        width: '70%',
        height: '500px',
    },
    tableHead: {
        width: '20%'
    },
    dialog: {
        width: '450px'
    },
    noReviewContentText: {
        textAlign: 'center',
        margin: theme.spacing(4, 0)
    },
    addReviewButton: {
        width: "140px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    recommendContent: {
        padding: theme.spacing(0, 1),
        marginBottom: theme.spacing(2)
    },
    recommendAvatar: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: 'auto',
    },
    recommendTitle: {
        padding: theme.spacing(1)
    },
    postReviewButton: {
        textTransform: 'none',
    }
}))

const SpotDetail: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    const dispatch: AppDispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [message, setMessage] = useState<{type: "success" | "error", message: string}>({type: "success", message: ""});
    const [postReview, setPostReview] = useState({ postReview: "", rating: 0 })

    const selectedSpot = useSelector(selectSelectedSpot);
    const selectedExhibits = useSelector(selectExhibits);
    const user = useSelector(selectUser);
    const lang = user.lang;

    const isDisabled: boolean = (postReview.postReview.length === 0 || !postReview.rating)

    useEffect( () => {
        console.log("useEffect is called")
        const fetchExhibitsLoader = async () => {
            await dispatch(fetchAsyncGetExhibits(selectedSpot.id))
            // send logs to server only in the case of login
            if (localStorage.startlensJWT) {
                await dispatch(fetchAsyncCreateUserStatistics({userId: selectedSpot.id}))
            }
        };
        fetchExhibitsLoader();
    }, [selectedSpot])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleMessageClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setPostReview({...postReview, [name]: value})
    };

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

    const selectExhibitAction = (exhibit: READ_EXHIBIT) => {
        dispatch(selectExhibit(exhibit));
        handleLink('/exhibits/detail');
    }

    const createReviewAction = async () => {
        const postContent: POST_REVIEW = {...postReview, userId: selectedSpot.id, lang: user.lang}
        const result = await dispatch(fetchAsyncCreateReview(postContent));
        if (fetchAsyncCreateReview.rejected.match(result)) {
            setMessage({type: "error", message: intl.formatMessage({ id: "spot.detail.reviewError", defaultMessage: "Failed to post a review" })});
            setSnackOpen(true);
            setOpen(false);
            return false
        }
        if (fetchAsyncCreateReview.fulfilled.match(result)) {
            setMessage({type: "success", message: intl.formatMessage({ id: "spot.detail.reviewSuccess", defaultMessage: "Successfully post a review" })});
            setSnackOpen(true);
            setOpen(false);
            setPostReview({ postReview: "", rating: 0 });
        }
    }

    const tableContents = [
        { title: intl.formatMessage({ id: "spot.card.username", defaultMessage: "Username" }), content: selectMultiProfileByLang(selectedSpot).username},
        { title: intl.formatMessage({ id: "spot.card.address", defaultMessage: "Address" }), content: selectMultiProfileByLang(selectedSpot).addressPrefecture + selectMultiProfileByLang(selectedSpot).addressCity + selectMultiProfileByLang(selectedSpot).addressStreet},
        { title: intl.formatMessage({ id: "spot.card.entranceFee", defaultMessage: "Entrance fee" }), content: selectMultiProfileByLang(selectedSpot).entranceFee},
        { title: intl.formatMessage({ id: "spot.card.businessHour", defaultMessage: "Business hour" }), content: selectMultiProfileByLang(selectedSpot).businessHours},
        { title: intl.formatMessage({ id: "spot.card.holiday", defaultMessage: "Holiday" }), content: selectMultiProfileByLang(selectedSpot).holiday},
        { title: intl.formatMessage({ id: "spot.card.telephone", defaultMessage: "Telephone" }), content: selectedSpot.profile.telephone},
        { title: intl.formatMessage({ id: "spot.card.homepage", defaultMessage: "Homepage" }), content: selectedSpot.profile.companySite},
    ]

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <Typography variant="h4" color="textPrimary">{selectMultiProfileByLang(selectedSpot).username}</Typography>
                <div className={commonStyles.spacer__small} />
                <div className={customStyles.spot_subtitle_wrapper}>
                    <Chip label={intl.formatMessage({ id: getMajorCategoryID(selectedSpot), defaultMessage: "Unselected" })} variant="outlined" size="small"/>
                    <Rating className={classes.rating} value={selectedSpot.profile.rating} precision={0.5} readOnly />
                    <Typography className={classes.ratingLabel} variant="h6" color="primary">{selectedSpot.profile.rating}</Typography>
                </div>
                <Typography variant="body1" color="textSecondary">{selectMultiProfileByLang(selectedSpot).addressPrefecture + selectMultiProfileByLang(selectedSpot).addressCity + selectMultiProfileByLang(selectedSpot).addressStreet}</Typography>
                <div className={commonStyles.spacer__small} />
                <div className={customStyles.spot_detail_avatar_wrapper}>
                    <Avatar variant="rounded" src={selectedSpot.profile.url} className={classes.avatar} alt="logo" />
                </div>
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <Typography variant="h6" color="textPrimary"><FormattedMessage id="spot.detail.introduction" defaultMessage="Introduction" /></Typography>
                    <Typography variant="body1" color="textSecondary">{selectMultiProfileByLang(selectedSpot).selfIntro}</Typography>
                </div>
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <Typography variant="h6" color="textPrimary"><FormattedMessage id="spot.detail.basicInfo" defaultMessage="Basic information" /></Typography>
                    <Table>
                        <TableBody>
                            {tableContents.map( (tableContent, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left" className={classes.tableHead}><strong>{tableContent.title}</strong></TableCell>
                                    <TableCell>{tableContent.content}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className={commonStyles.spacer__small} />
                {selectedSpot.profile.latitude && selectedSpot.profile.longitude && (<GoogleMapComponent />)}
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <div className={customStyles.review_title_wrapper}>
                        <Typography variant="h6" color="textPrimary"><FormattedMessage id="spot.detail.review" defaultMessage="Review" /></Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            size="small"
                            className={classes.addReviewButton}
                            onClick={ handleOpen }
                            disableElevation
                        >
                            <FormattedMessage id="spot.detail.reviewButton" defaultMessage="New post" />
                        </Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" className={classes.dialog}><FormattedMessage id="spot.detail.reviewButton" defaultMessage="New post" /></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <FormattedMessage id="spot.detail.postReview" defaultMessage="Let's post your review" />
                                </DialogContentText>
                                <div className={commonStyles.spacer__medium} />
                                <Rating className={classes.rating}
                                    value={postReview.rating}
                                    name="rating"
                                    onChange={(event, newValue) => setPostReview({...postReview, rating: Number(newValue)})}
                                />
                                <div className={commonStyles.spacer__small} />
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label={intl.formatMessage({ id: "spot.detail.review", defaultMessage: "Review" })}
                                    type="text"
                                    name="postReview"
                                    multiline
                                    rows={4}
                                    value={postReview.postReview}
                                    onChange={handleInputChange}
                                />
                                <div className={commonStyles.spacer__medium} />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleClose}
                                    color="primary"
                                    className={classes.postReviewButton}
                                >
                                    <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
                                </Button>
                                <Button
                                    onClick={() => createReviewAction()}
                                    disabled={isDisabled}
                                    color="primary"
                                    className={classes.postReviewButton}
                                >
                                    <FormattedMessage id="button.post" defaultMessage="Post" />
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleMessageClose}>
                            <Alert onClose={handleClose} severity={message.type}>
                                {message.message}
                            </Alert>
                        </Snackbar>
                    </div>
                    { selectedSpot.reviews[0] ? (
                            <div className={customStyles.review_content_wrapper}>
                                <ReviewList />
                            </div>
                        ) : (
                            <Typography variant="body1" color="textSecondary" className={classes.noReviewContentText}><FormattedMessage id="spot.detail.noReview" defaultMessage="No review" /></Typography>
                        )
                    }
                </div>
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <Typography variant="h6" color="textPrimary"><FormattedMessage id="spot.detail.favorite" defaultMessage="Favorite spot" /></Typography>
                    <div className={commonStyles.spacer__small} />
                    <Grid container>
                        {selectedExhibits.map( (exhibit, index) => (
                            <Grid item key={index} xs={12} md={4} className={classes.recommendContent}>
                                <Paper>
                                    <ButtonBase
                                        focusRipple
                                        onClick={ () => selectExhibitAction(exhibit)}
                                    >
                                        <Avatar variant="rounded" src={exhibit.pictures[0].url} className={classes.recommendAvatar} alt="recommendImage" />
                                    </ButtonBase>
                                    <Typography variant="subtitle1" color="textPrimary" noWrap className={classes.recommendTitle}>{selectMultiExhibitByLang(exhibit).name}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Paper>
        </Container>
    )
}

export default SpotDetail
