import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    Container,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Paper,
    MenuItem,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from '@material-ui/core';

import { AppDispatch } from '../../../app/store';
import {
    editProfile,
    editThumbnail,
    fetchAsyncUpdateProfile,
    fetchAsyncUpdateThumbnail,
    selectEditedProfile,
    selectEditedThumbnail,
    selectUser
} from './authUserSlice';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Auth.module.css';
import {
    birthCategoryObj,
    langItem,
    sexItem,
    worldItem
} from '../../../app/constant';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(4, 0),
        padding: theme.spacing(4)
    },
    title: {
        textAlign: 'center'
    },
    nextStepButton: {
        color: '#fff',
        marginLeft: theme.spacing(1),
        textTransform: 'none',
    },
    formControl: {
        width: "200px",
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        width: '200px',
        height: '200px',
    },
    uploadButton: {
        textTransform: 'none',
    },
    textField: {
        width: '200px'
    },
    editPictureButton: {
        width: "200px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'none',
    },
    uploadedAvatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.grey[500],
        width: '300px',
        height: '300px',
    },
    backButton: {
        textTransform: 'none',
    }
}));


const Profile: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);

    const editedProfile = useSelector(selectEditedProfile);
    const editedThumbnail = useSelector(selectEditedThumbnail);
    const user = useSelector(selectUser);

    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);

    const steps = [intl.formatMessage({ id: "profile.step.langTitle", defaultMessage: "Enter your language" }), intl.formatMessage({ id: 'profile.step.userTitle', defaultMessage: "Enter your information" })];

    const isDisabledLanguage = (editedProfile.lang.length === 0)
    const isDisabledProfile = (editedProfile.username.length === 0 || editedProfile.birth === 0 ||
                                editedProfile.sex === 0 || editedProfile.country === "na")

    const getStepContent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return intl.formatMessage({ id: 'profile.langTitle', defaultMessage: "Language" })
            case 1:
                return intl.formatMessage({ id: 'profile.userTitle', defaultMessage: "User information" })
            default:
                return intl.formatMessage({ id: 'profile.langTitle', defaultMessage: "Language" })
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleEditThumbnail = () => {
        const fileInput = document.getElementById("imageInput")
        fileInput?.click();
    };

    const handleNext = () => {
        setActiveStep( (prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep( (prevActiveStep) => prevActiveStep - 1)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        dispatch(editProfile({...editedProfile, [name]: value}))
    };

    const handleSelectLangChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as string;
        dispatch(editProfile({...editedProfile, lang: value}))
    };

    const handleSelectSexChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as number;
        dispatch(editProfile({...editedProfile, sex: value}))
    };

    const handleSelectBirthChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as number;
        dispatch(editProfile({...editedProfile, birth: value}))
    };

    const handleSelectCountryChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as string;
        dispatch(editProfile({...editedProfile, country: value}))
    };

    let langOptions = langItem.map( (item) => (
        <MenuItem key={item.key} value={item.key}>
            {intl.formatMessage({ id: item.id, defaultMessage: item.default })}
        </MenuItem>
    ));

    let sexOptions = sexItem.map( (item) => (
        <MenuItem key={item.key} value={item.key}>
            {intl.formatMessage({ id: item.id, defaultMessage: item.default })}
        </MenuItem>
    ));

    let birthOptions = Object.keys(birthCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {birthCategoryObj[Number(key)]}
        </MenuItem>
    ));

    let worldCountryOptions = worldItem.map( (item) => (
        <MenuItem key={item.key} value={item.key}>
            {intl.formatMessage({ id: item.id, defaultMessage: item.default })}
        </MenuItem>
    ));

    const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const THUMBNAIL_WIDTH = 500;
        const THUMBNAIL_HEIGHT = 500;

        const file: File = e.target.files![0];
        // validation: jpg and png format is permitted to upload as an image
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            console.log("validation failed")
            return false;
        }
        // resize a image
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                let width = image.width;
                let height = image.height;
                if (width > height) {
                    // the length of width is longer than the one of height, adjust to the length of height
                    width = THUMBNAIL_WIDTH;
                    height = Math.round(THUMBNAIL_WIDTH * height / width);
                } else {
                    width = Math.round(THUMBNAIL_HEIGHT * width / height );
                    height = THUMBNAIL_HEIGHT;
                }
                console.log("hight: ", height)
                console.log("width: ", width)
                let canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext('2d');
                ctx?.drawImage(image, 0, 0, width, height);
                const encodedImage = ctx?.canvas.toDataURL(file.type) as string;
                dispatch(editThumbnail({...editedThumbnail, imageFile: encodedImage}))
            }
            image.src = e.target?.result as string;
        }
        reader.onerror = (error) => {
            console.log("error: cannot read any files");
        }
    };

    const saveThumbnailAction = async () => {
        setActive(true);
        setLoading(true);
        const result = await dispatch(fetchAsyncUpdateThumbnail(editedThumbnail));
        if (fetchAsyncUpdateThumbnail.rejected.match(result)) {
            setActive(false);
            setLoading(false);
            handleClose();
            return false
        }
        if (fetchAsyncUpdateThumbnail.fulfilled.match(result)) {
            setActive(false);
            setLoading(false);
            handleClose();
        }
    }

    const saveProfileAction = async () => {
        const result = await dispatch(fetchAsyncUpdateProfile(editedProfile));
        if (fetchAsyncUpdateProfile.rejected.match(result)) {
            return false
        }
        if (fetchAsyncUpdateProfile.fulfilled.match(result)) {
            handleLink('/');
        }
    };

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map( (label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === 0 ? (
                        <div className={customStyles.profile_settings_wrapper}>
                            <Typography variant="h6" className={classes.title}>{getStepContent(activeStep)}</Typography>
                            <div className={customStyles.profile_settings_form}>
                                <div className={commonStyles.spacer__small} />
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="language-select-label"><FormattedMessage id="profile.form.lang" defaultMessage="Language" /></InputLabel>
                                    <Select
                                        labelId="language-select-label"
                                        name="lang"
                                        value={editedProfile.lang}
                                        onChange={handleSelectLangChange}
                                    >
                                        {langOptions}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={customStyles.profile_settings_form}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.nextStepButton}
                                    disabled={isDisabledLanguage}
                                    onClick={handleNext}
                                    disableElevation
                                >
                                    <FormattedMessage id="profile.nextButton" defaultMessage="Next" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={customStyles.profile_user_settings_wrapper}>
                            <Typography variant="h6" className={classes.title}>{getStepContent(activeStep)}</Typography>
                            <div className={commonStyles.spacer__small} />
                            { loading && <CircularProgress /> }
                            { user.thumbnailUrl ?
                                (<Avatar variant="rounded" src={user.thumbnailUrl} className={classes.avatar} alt="thumbnail" />)
                                : (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />) 
                            }
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpen}
                                className={classes.editPictureButton}
                                disableElevation
                            >
                                <FormattedMessage id="profile.thumbnailButton" defaultMessage="Thumbnail image" />
                            </Button>
                            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                <DialogTitle id="customized-dialog-title">
                                    <FormattedMessage id="profile.thumbnailTitle" defaultMessage="Edit thumbnail image" />
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        <FormattedMessage id="profile.thumbnailSubTitle" defaultMessage="Select a jpg/jpeg, png image file whose file size is smaller than 1M and upload it." />
                                    </Typography>
                                    <div className={customStyles.thumbnail_edit_wrapper}>
                                        {editedThumbnail.imageFile ?
                                            <Avatar variant="rounded" src={editedThumbnail.imageFile} className={classes.uploadedAvatar} alt="thumbnail" /> :
                                            <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.uploadedAvatar} alt="thumbnail" />
                                        }
                                    </div>
                                    <input
                                        type="file"
                                        id="imageInput"
                                        hidden={true}
                                        onChange={handleUploadThumbnail}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleEditThumbnail} color="primary" className={classes.uploadButton}>
                                        <FormattedMessage id="profile.uploadButton" defaultMessage="Upload" />
                                    </Button>
                                    <Button onClick={saveThumbnailAction} color="primary" className={classes.uploadButton} disabled={active}>
                                        <FormattedMessage id="profile.saveButton" defaultMessage="Save" />
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <div className={commonStyles.spacer__medium} />
                            <TextField
                                variant="outlined"
                                label={intl.formatMessage({ id: 'profile.username', defaultMessage: "Username" })}
                                type="text"
                                name="username"
                                value={editedProfile.username}
                                className={classes.textField}
                                onChange={handleInputChange}
                            />
                            <div className={commonStyles.spacer__medium} />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="sex-select-label"><FormattedMessage id="profile.sex" defaultMessage="Sex" /></InputLabel>
                                <Select
                                    labelId="sex-select-label"
                                    name="sex"
                                    value={editedProfile.sex}
                                    onChange={handleSelectSexChange}
                                >
                                    {sexOptions}
                                </Select>
                            </FormControl>
                            <div className={commonStyles.spacer__medium} />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="birth-select-label"><FormattedMessage id="profile.birth" defaultMessage="Birth year" /></InputLabel>
                                <Select
                                    labelId="birth-select-label"
                                    name="birth"
                                    value={editedProfile.birth}
                                    onChange={handleSelectBirthChange}
                                >
                                    {birthOptions}
                                </Select>
                            </FormControl>
                            <div className={commonStyles.spacer__medium} />
                            <FormControl className={classes.formControl}>
                                <InputLabel id="country-select-label"><FormattedMessage id="profile.country" defaultMessage="Country" /></InputLabel>
                                <Select
                                    labelId="country-select-label"
                                    name="country"
                                    value={editedProfile.country}
                                    onChange={handleSelectCountryChange}
                                >
                                    {worldCountryOptions}
                                </Select>
                            </FormControl>
                            <div className={commonStyles.spacer__medium} />
                            <div className={customStyles.profile_settings_form}>
                                <Button
                                    variant="outlined"
                                    className={classes.backButton}
                                    onClick={handleBack}
                                    disableElevation
                                >
                                    <FormattedMessage id="button.back" defaultMessage="Back" />
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.nextStepButton}
                                    onClick={saveProfileAction}
                                    disabled={isDisabledProfile}
                                    disableElevation
                                >
                                    <FormattedMessage id="button.register" defaultMessage="Register" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Paper>
        </Container>
    )
}

export default Profile
