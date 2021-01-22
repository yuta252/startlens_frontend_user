import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

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
    TableHead,
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
import { majorCategoryChipObj } from '../../../app/constant';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Top.module.css';
import { POST_REVIEW, READ_EXHIBIT } from '../../types';


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
    }
}))

const SpotDetail: React.FC = () => {
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

    const isDisabled: boolean = (postReview.postReview.length === 0 || !postReview.rating)

    const tableContents = [
        { title: "ユーザー名", content: selectedSpot.multiProfiles.slice(-1)[0].username},
        { title: "場所", content: selectedSpot.multiProfiles.slice(-1)[0].addressPrefecture + selectedSpot.multiProfiles.slice(-1)[0].addressCity + selectedSpot.multiProfiles.slice(-1)[0].addressStreet},
        { title: "料金", content: selectedSpot.multiProfiles.slice(-1)[0].entranceFee},
        { title: "営業時間", content: selectedSpot.multiProfiles.slice(-1)[0].businessHours},
        { title: "休日", content: selectedSpot.multiProfiles.slice(-1)[0].holiday},
        { title: "電話番号", content: selectedSpot.profile.telephone},
        { title: "ホームページ", content: selectedSpot.profile.companySite},
    ]

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

    const selectExhibitAction = (exhibit: READ_EXHIBIT) => {
        dispatch(selectExhibit(exhibit));
        handleLink('/exhibits/detail');
    }

    const createReviewAction = async () => {
        const postContent: POST_REVIEW = {...postReview, userId: selectedSpot.id, lang: user.lang}
        const result = await dispatch(fetchAsyncCreateReview(postContent));
        if (fetchAsyncCreateReview.rejected.match(result)) {
            setMessage({type: "error", message: "レビューの投稿に失敗しました"});
            setSnackOpen(true);
            setOpen(false);
            return false
        }
        if (fetchAsyncCreateReview.fulfilled.match(result)) {
            setMessage({type: "success", message: "レビューの投稿に成功しました"});
            setSnackOpen(true);
            setOpen(false);
            setPostReview({ postReview: "", rating: 0 });
        }
    }

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <Typography variant="h4" color="textPrimary">{selectedSpot.multiProfiles.slice(-1)[0].username}</Typography>
                <div className={commonStyles.spacer__small} />
                <div className={customStyles.spot_subtitle_wrapper}>
                    <Chip label={`${majorCategoryChipObj[selectedSpot.profile.majorCategory]}`} variant="outlined" size="small"/>
                    <Rating className={classes.rating} value={selectedSpot.profile.rating} precision={0.5} readOnly />
                    <Typography className={classes.ratingLabel} variant="h6" color="primary">{selectedSpot.profile.rating}</Typography>
                </div>
                <Typography variant="body1" color="textSecondary">{selectedSpot.multiProfiles.slice(-1)[0].addressPrefecture + selectedSpot.multiProfiles.slice(-1)[0].addressCity + selectedSpot.multiProfiles.slice(-1)[0].addressStreet}</Typography>
                <div className={commonStyles.spacer__small} />
                <div className={customStyles.spot_detail_avatar_wrapper}>
                    <Avatar variant="rounded" src={selectedSpot.profile.url} className={classes.avatar} alt="logo" />
                </div>
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <Typography variant="h6" color="textPrimary">紹介文</Typography>
                    <Typography variant="body1" color="textSecondary">{selectedSpot.multiProfiles.slice(-1)[0].selfIntro}</Typography>
                </div>
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <Typography variant="h6" color="textPrimary">基本情報</Typography>
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
                        <Typography variant="h6" color="textPrimary">レビュー一覧</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            size="small"
                            className={classes.addReviewButton}
                            onClick={ handleOpen }
                            disableElevation
                        >
                            レビュー投稿
                        </Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" className={classes.dialog}>レビューの新規投稿</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    評価とレビューを投稿してください
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
                                    label="レビュー"
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
                                <Button onClick={handleClose} color="primary">
                                    キャンセル
                                </Button>
                                <Button
                                    onClick={() => createReviewAction()}
                                    disabled={isDisabled} color="primary"
                                >
                                    投稿
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
                            <Typography variant="body1" color="textSecondary" className={classes.noReviewContentText}>レビューがありません。</Typography>
                        )
                    }
                </div>
                <div className={customStyles.spot_detail_divider} />
                <div>
                    <Typography variant="h6" color="textPrimary">おすすめスポット</Typography>
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
                                    <Typography variant="subtitle1" color="textPrimary" noWrap className={classes.recommendTitle}>{exhibit.multiExhibits.slice(-1)[0].name}</Typography>
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
