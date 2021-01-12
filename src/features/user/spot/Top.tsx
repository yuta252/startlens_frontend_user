import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

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
import SpotCard from './SpotCard';
import { countryCategoryObj, majorCategoryChipObj } from '../../../app/constant';
import customStyles from './Top.module.css';


const useStyles = makeStyles((theme: Theme) => ({
    image: {
        width: '100vw',
        height: '350px',
        margin: '-32px -32px 80px -32px',
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
        border: 'solid 2px'
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
        marginLeft: '16px'
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
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);

    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const searchQueryAction = async () => {
        await dispatch(fetchAsyncGetSpots({query: query}));
        handleLink('/spots/search');
        console.log("query is clicked")
    }

    const searchCountryAction = async (prefecture: string) => {
        await dispatch(fetchAsyncGetSpots({prefecture: prefecture}));
        handleLink('/spots/search');
        console.log("country is clicked")
    }

    const searchCategoryAction = async (category: number) => {
        await dispatch(fetchAsyncGetSpots({category: category}));
        handleLink('/spots/search');
        console.log("category action is clicked")
    }

    return (
        <>
            <div className={classes.image} >
                <div className={classes.imageCover}></div>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.aboutButton}
                    disableElevation
                >
                    What's Startlens
                </Button>
                <div className={customStyles.top_title_wrapper}>
                    <Typography variant="h4" className={classes.title}>Let's start on a journey online</Typography>
                    <div className={customStyles.top_subtitle_wrapper}>
                        <Typography variant="subtitle1" className={classes.title}>オンラインから目的地を探して観光をするサイト</Typography>
                        <Typography variant="subtitle1" className={classes.title}>それがStartlensです</Typography>
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
                        検索
                    </Button>
                </Paper>
            </div>
            <Container maxWidth="md">
                <div>
                    <Typography variant="h6">場所から探す</Typography>
                    <Grid container>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction("東京")}>
                                <div className={classes.imageTokyo}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>東京</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction("大阪")}>
                                <div className={classes.imageOsaka}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>大阪</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction("京都")}>
                                <div className={classes.imageKyoto}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>京都</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCountryAction("名古屋")}>
                                <div className={classes.imageNagoya}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>名古屋</div>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <div className={customStyles.other_area_wrapper}>
                    <Typography variant="subtitle1">その他の場所</Typography>
                    <Grid container>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong>北海道・東北</strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryObj.tohoku.map( (country, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(country)}>{country}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong>関東</strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryObj.kanto.map( (country, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(country)}>{country}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong>中部</strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryObj.chubu.map( (country, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(country)}>{country}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong>関西</strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryObj.kansai.map( (country, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(country)}>{country}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong>中国・四国</strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryObj.chuboku.map( (country, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(country)}>{country}</Link></li>
                                )}
                            </ul>
                        </Grid>
                        <Grid item xs={4} sm={2} className={classes.countryContent}>
                            <Typography variant="subtitle2"><strong>九州</strong></Typography>
                            <ul className={customStyles.other_area_list}>
                                {countryCategoryObj.kyusyu.map( (country, index) =>
                                    <li key={index}><Link variant="body2" color="secondary" onClick={ () => searchCountryAction(country)}>{country}</Link></li>
                                )}
                            </ul>
                        </Grid>
                    </Grid>
                </div>
                <div className={customStyles.category_content_wrapper}>
                    <Typography variant="h6">カテゴリーから探す</Typography>
                    <Grid container>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(22)}>
                                <div className={classes.imageTemple}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>神社・寺院・教会</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(31)}>
                                <div className={classes.imageThemePark}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>テーマ施設</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(27)}>
                                <div className={classes.imageBuilding}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>建造物</div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.countryContent}>
                            <Link variant="button" onClick={ () => searchCategoryAction(32) }>
                                <div className={classes.imageHotSpring}></div>
                                <div className={classes.imageCountryCover}></div>
                                <div className={classes.imageCountryText}>温泉</div>
                            </Link>
                        </Grid>
                        <div className={customStyles.other_category_wrapper}>
                            {Object.keys(majorCategoryChipObj).map( (key) => (
                                <Chip key={key} label={`${majorCategoryChipObj[Number(key)]}`} variant="outlined" onClick={ () => searchCategoryAction(Number(key)) } className={classes.chip}/>
                            ))}
                        </div>
                    </Grid>
                </div>
                <div className={customStyles.category_content_wrapper}>
                    <Typography variant="h6">新着情報</Typography>
                    <div className={customStyles.new_spot_wrapper}>
                        <SpotCard />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Top
