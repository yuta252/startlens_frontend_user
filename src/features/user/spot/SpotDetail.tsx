import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    ButtonBase,
    Chip,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { AppDispatch } from '../../../app/store';
import { selectSelectedSpot } from './spotSlice';
import {
    fetchAsyncGetExhibits,
    selectExhibit,
    selectExhibits,
} from '../exhibit/exhibitSlice'
import { majorCategoryChipObj } from '../../../app/constant';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Top.module.css';
import { READ_EXHIBIT } from '../../types';


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

    const selectedSpot = useSelector(selectSelectedSpot);
    const selectedExhibits = useSelector(selectExhibits);

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
        const fetchExhibitsLoader = async () => {
            await dispatch(fetchAsyncGetExhibits(selectedSpot.id))
        };
        fetchExhibitsLoader();
    }, [selectedSpot])

    const selectExhibitAction = (exhibit: READ_EXHIBIT) => {
        dispatch(selectExhibit(exhibit));
        handleLink('/exhibits/detail');
        console.log("exhibit is clicked");
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
