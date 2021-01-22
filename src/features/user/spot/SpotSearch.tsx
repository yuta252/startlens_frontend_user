import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { FormattedMessage, useIntl } from 'react-intl';

import {
    Button,
    Container,
    FormControl,
    Grid,
    MenuItem,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import MuiPagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";

import { AppDispatch } from '../../../app/store';
import {
    fetchAsyncGetSpots,
    selectParams,
    selectSpots
} from './spotSlice';
import {
    countryCategoryChubuItem,
    countryCategoryChugokuItem,
    countryCategoryKansaiItem,
    countryCategoryKantoItem,
    countryCategoryKyusyuItem,
    countryCategoryTohokuItem,
    majorCategoryChipItem,
} from '../../../app/constant';
import SpotCard from './SpotCard';
import customStyles from './Top.module.css';


const useStyles = makeStyles((theme: Theme) => ({
    searchWrap: {
        padding: theme.spacing(2, 0)
    },
    searchIcon: {
        color: theme.palette.grey[500]
    },
    searchTextField: {
        marginTop: theme.spacing(2)
    },
    formControl: {
        minWidth: "160px",
        marginLeft: "8px",
    },
    searchContent: {
        display: 'flex',
        marginTop: theme.spacing(2)
    },
    searchButton: {
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
        width: '80px',
        marginLeft: '8px',
        flexGrow: 1,
        textTransform: 'none',
    },
    pagination: {
        display: 'inline-block',
    }
}))

const Pagination = withStyles({
    root: {
        display: 'inline-block',
    },
})(MuiPagination);


const SpotSearch: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const selectedParams = useSelector(selectParams);
    const spots = useSelector(selectSpots);

    const countryCategoryItem = [
        {key: 'Unselected', id: 'category.unselected', default: 'Unselected'},
        ...countryCategoryTohokuItem, ...countryCategoryKantoItem,
        ...countryCategoryChubuItem, ...countryCategoryKansaiItem,
        ...countryCategoryChugokuItem, ...countryCategoryKyusyuItem
    ]

    const [params, setParams] = useState({query: selectedParams.query, category: selectedParams.category, prefecture: selectedParams.prefecture, page: selectedParams.page});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams({...params, query: value});
    };

    const handleSelectCategoryChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as number;
        setParams({...params, category: value})
    };

    const handleSelectAddressChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as string;
        if (value === intl.formatMessage({ id: "category.unselected", defaultMessage: "Unselected" })) {
            setParams({...params, prefecture: ""})
        } else {
            setParams({...params, prefecture: value})
        }
    };

    let categoryOptions = majorCategoryChipItem.map( (item) => (
        <MenuItem key={item.key} value={Number(item.key)}>
            {intl.formatMessage({ id: item.id, defaultMessage: item.default })}
        </MenuItem>
    ));

    let addressOptions = countryCategoryItem.map( (item) => (
        <MenuItem key={item.key} value={intl.formatMessage({ id: item.id, defaultMessage: item.default })}>
            {intl.formatMessage({ id: item.id, defaultMessage: item.default })}
        </MenuItem>
    ));

    const searchAction = async () => {
        await dispatch(fetchAsyncGetSpots(params));
    }

    const getSpotsPaginated = async (page: number) => {
        setParams({...params, page: page})
        await dispatch(fetchAsyncGetSpots(params));
    }

    return (
        <Container maxWidth="md">
            <div className={customStyles.category_content_wrapper}>
                <Grid container className={classes.searchWrap}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" className={classes.searchTextField}>
                            <OutlinedInput
                                startAdornment={<InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>}
                                value={params.query}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.searchContent}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="address-select-label"><FormattedMessage id="search.form.location" defaultMessage="Location" /></InputLabel>
                            <Select
                                labelId="address-select-label"
                                name="prefecture"
                                value={params.prefecture ?　params.prefecture : intl.formatMessage({ id: 'category.unselected', defaultMessage: "Unselected" }) }
                                onChange={handleSelectAddressChange}
                                label={intl.formatMessage({ id: "search.form.location", defaultMessage: "Location" })}
                            >
                                {addressOptions}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="category-select-label"><FormattedMessage id="search.form.category" defaultMessage="Category" /></InputLabel>
                            <Select
                                labelId="category-select-label"
                                name="category"
                                value={params.category}
                                defaultValue={0}
                                onChange={handleSelectCategoryChange}
                                label={intl.formatMessage({ id: "search.form.category", defaultMessage: "Category" })}
                            >
                                {categoryOptions}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.searchButton}
                            onClick={searchAction}
                            disableElevation
                        >
                            <FormattedMessage id="top.searchButton" defaultMessage="Search" />
                        </Button>
                    </Grid>
                </Grid>
                <Typography variant="h6"><FormattedMessage id="search.result.title" defaultMessage="Search result" /></Typography>
                {spots.length ? (
                    <div>
                        <div className={customStyles.new_spot_wrapper}>
                            <SpotCard />
                        </div>
                        <div className={customStyles.search_pagination_wrapper}>
                            <Pagination
                                className={classes.pagination}
                                count={selectedParams.last}
                                color="primary"
                                onChange={(e, page) => getSpotsPaginated(page)}
                                page={params.page}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={customStyles.search_no_result_wrapper}>
                        <Typography variant="subtitle1"><FormattedMessage id="search.noResult" defaultMessage="No search result. Try it again." /></Typography>
                    </div>
                )}
            </div>
        </Container>
    )
}

export default SpotSearch
