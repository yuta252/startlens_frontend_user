import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Button,
    Chip,
    Container,
    FormControl,
    Grid,
    Link,
    InputAdornment,
    OutlinedInput,
    Paper,
    Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { AppDispatch } from '../../../app/store';
import {
    fetchAsyncGetSpots
} from './spotSlice';
import SpotNewCard from './SpotNewCard';
import {
    countryCategoryChubuItem,
    countryCategoryChugokuItem,
    countryCategoryKansaiItem,
    countryCategoryKantoItem,
    countryCategoryKyusyuItem,
    countryCategoryTohokuItem,
    majorCategoryChipItem
} from '../../../app/constant';
import customStyles from './Top.module.css';


const useStyles = makeStyles((theme: Theme) => ({
    image: {
        width: '100vw',
        height: '350px',
        margin: '0px 24px 80px -24px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background-cover.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    imageCover: {
        position: 'absolute',
        top: '0',
        right: '0',
        left: '0',
        bottom: '0',
        height: '350px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
        color: '#fff',
        textAlign: 'center',
    },
    aboutButton: {
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        fontWeight: theme.typography.fontWeightBold,
        borderRadius: '20px',
        border: 'solid 2px',
        textTransform: 'none',
    },
    paper: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        width: '90%',
        maxWidth: '860px',
        margin: 'auto',
        padding: '24px',
        transform: 'translateX(-50%) translateY(-50%)',
        display: 'flex',
    },
    searchIcon: {
        color: theme.palette.grey[500]
    },
    searchButton: {
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
        width: '80px',
        marginLeft: '16px',
        textTransform: 'none',
    },
    countryContent: {
        padding: theme.spacing(1),
        position: 'relative'
    },
    imageTokyo: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/tokyo_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageOsaka: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/osaka_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageKyoto: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/kyoto_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageNagoya: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/nagoya_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageCountryCover: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        left: '8px',
        bottom: '0',
        height: '110px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    imageCountryText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        fontWeight: theme.typography.fontWeightBold,
        color: '#fff',
        cursor: 'pointer'
    },
    chip: {
        margin: theme.spacing(0.5, 1, 0.5, 0)
    },
    imageTemple: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/temple_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageThemePark: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/theme_park_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageBuilding: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/building_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
    imageHotSpring: {
        width: '100%',
        height: '110px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/hot_spring_image.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '5px'
    },
}));


const Top: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);

    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const moveToAboutAction = () => {
        handleLink('/about');
    }

    const searchQueryAction = async () => {
        await dispatch(fetchAsyncGetSpots({query: query}));
        handleLink('/spots/search');
    }

    const searchCountryAction = async (prefecture: string) => {
        await dispatch(fetchAsyncGetSpots({prefecture: prefecture}));
        handleLink('/spots/search');
    }

    const searchCategoryAction = async (category: number) => {
        await dispatch(fetchAsyncGetSpots({category: category}));
        handleLink('/spots/search');
    }

    return (
        <>
            <div className={classes.image} >
                <div className={classes.imageCover}></div>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.aboutButton}
                    onClick={moveToAboutAction}
                    disableElevation
                >
                    What's Startlens?
                </Button>
                <div className={customStyles.top_title_wrapper}>
                    <Typography variant="h4" className={classes.title}>Let's start on a journey online</Typography>
                    <div className={customStyles.top_subtitle_wrapper}>
                        <Typography variant="subtitle1" className={classes.title}>
                            <FormattedMessage id="top.subTitle1" defaultMessage="A new journey starting online" />
                        </Typography>
                        <Typography variant="subtitle1" className={classes.title}>
                            <FormattedMessage id="top.subTitle2" defaultMessage="It's Startlens" />
                        </Typography>
                    </div>
                </div>
                <Paper className={classes.paper}>
                    <FormControl fullWidth variant="outlined">
                        <OutlinedInput
                            startAdornment={<InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>}
                            value={query}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.searchButton}
                        onClick={searchQueryAction}
                        disableElevation
                    >
                        <FormattedMessage id="top.searchButton" defaultMessage="Search" />
                    </Button>
                </Paper>
            </div>
            <Container maxWidth="md">
                <div>
                    <Typography variant="h6"><FormattedMessage id="country.searchTitle" defaultMessage="Search by location" /></Typography>
                    <Grid container>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction(intl.formatMessage({ id: "country.tokyo", defaultMessage: "Tokyo" }))}>
                                <div className={classes.imageTokyo}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="country.tokyo" defaultMessage="Tokyo" /></div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction(intl.formatMessage({ id: "country.osaka", defaultMessage: "Osaka" }))}>
                                <div className={classes.imageOsaka}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="country.osaka" defaultMessage="Osaka" /></div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction(intl.formatMessage({ id: "country.kyoto", defaultMessage: "Kyoto" }))}>
                                <div className={classes.imageKyoto}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="country.kyoto" defaultMessage="Kyoto" /></div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction(intl.formatMessage({ id: "country.aichi", defaultMessage: "Aichi" }))}>
                                <div className={classes.imageNagoya}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="country.aichi" defaultMessage="Aichi" /></div>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <div className={customStyles.other_area_wrapper}>
                    <Typography variant="subtitle1"><FormattedMessage id="country.titleOther" defaultMessage="Other places" /></Typography>
                    <Grid container>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong><FormattedMessage id="country.titleHokkaido" defaultMessage="Hokkaido / Tohoku"/></strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryTohokuItem.map( (item, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(intl.formatMessage({ id: item.id, defaultMessage: item.default }))}>{intl.formatMessage({ id: item.id, defaultMessage: item.default })}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong><FormattedMessage id="country.titleKanto" defaultMessage="Kanto"/></strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryKantoItem.map( (item, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(intl.formatMessage({ id: item.id, defaultMessage: item.default }))}>{intl.formatMessage({ id: item.id, defaultMessage: item.default })}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong><FormattedMessage id="country.titleChubu" defaultMessage="Chubu"/></strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryChubuItem.map( (item, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(intl.formatMessage({ id: item.id, defaultMessage: item.default }))}>{intl.formatMessage({ id: item.id, defaultMessage: item.default })}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong><FormattedMessage id="country.titleKansai" defaultMessage="Kansai"/></strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryKansaiItem.map( (item, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(intl.formatMessage({ id: item.id, defaultMessage: item.default }))}>{intl.formatMessage({ id: item.id, defaultMessage: item.default })}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong><FormattedMessage id="country.titleChugoku" defaultMessage="Chugoku / Shikoku"/></strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryChugokuItem.map( (item, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(intl.formatMessage({ id: item.id, defaultMessage: item.default }))}>{intl.formatMessage({ id: item.id, defaultMessage: item.default })}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong><FormattedMessage id="country.titleKyusyu" defaultMessage="Kyusyu / Okinawa"/></strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryKyusyuItem.map( (item, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(intl.formatMessage({ id: item.id, defaultMessage: item.default }))}>{intl.formatMessage({ id: item.id, defaultMessage: item.default })}</Link></li>
                                )}
                            </ul>
                        </Grid>
                    </Grid>
                </div>
                <div className={customStyles.category_content_wrapper}>
                    <Typography variant="h6"><FormattedMessage id="category.searchTitle" defaultMessage="Search by category" /></Typography>
                    <Grid container>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(22)}>
                                <div className={classes.imageTemple}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="category.religiousBuilding" defaultMessage="Religious building" /></div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(31)}>
                                <div className={classes.imageThemePark}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="category.themePark" defaultMessage="Theme park" /></div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(27)}>
                                <div className={classes.imageBuilding}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="category.building" defaultMessage="Building" /></div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(32) }>
                                <div className={classes.imageHotSpring}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}><FormattedMessage id="category.hotSpring" defaultMessage="Hot spring" /></div>
                            </Link>
                        </Grid>
                        <div className={customStyles.other_category_wrapper}>
                            {majorCategoryChipItem.map( (item) => (
                                Number(item.key) !== 0 && (
                                    <Chip key={item.key} label={intl.formatMessage({ id: item.id, defaultMessage: item.default })} variant="outlined" onClick={ () => searchCategoryAction(Number(item.key)) } className={classes.chip}/>
                                )
                            ))}
                        </div>
                    </Grid>
                </div>
                <div className={customStyles.category_content_wrapper}>
                    <Typography variant="h6"><FormattedMessage id="newInfo.title" defaultMessage="New Information" /></Typography>
                    <div className={customStyles.new_spot_wrapper}>
                        <SpotNewCard />
                    </div>
                </div>
            </Container>
        </>
    )
}


export default Top;
