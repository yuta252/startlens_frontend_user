import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Paper,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';

import { AppDispatch } from '../../../app/store';
import {
    editProfile,
    editThumbnail,
    fetchAsyncGetUserInfo,
    fetchAsyncUpdateProfile,
    fetchAsyncUpdateThumbnail,
    selectEditedProfile,
    selectEditedThumbnail,
    selectUser
} from './authUserSlice';
import { POST_PROFILE } from '../../types';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Auth.module.css';
import { birthCategoryObj, langCategoryObj, sexCategoryObj, worldCountryObj } from '../../../app/constant';


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
        marginLeft: theme.spacing(1)
    },
    formControl: {
        width: "400px",
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        width: '200px',
        height: '200px',
    },
    textField: {
        width: '400px'
    },
    editPictureButton: {
        width: "140px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    uploadedAvatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.grey[500],
        width: '300px',
        height: '300px',
    },
}));


const ProfileEdit: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);

    const selectedUser = useSelector(selectUser);
    const editedProfile = useSelector(selectEditedProfile);
    const editedThumbnail = useSelector(selectEditedThumbnail);
    const user = useSelector(selectUser);

    const [open, setOpen] = useState(false);

    useEffect( () => {
        const { email, thumbnailUrl, ...restProfile } = user;
        dispatch(editProfile({...restProfile}));
        dispatch(editThumbnail({id: user.id, imageFile: thumbnailUrl}));
    }, []);

    const isDisabledProfile = (editedProfile.lang.length === 0 || editedProfile.username.length === 0 ||
                            editedProfile.birth === 0 || editedProfile.sex === 0 || editedProfile.country === "na")

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

    let langOptions = Object.keys(langCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {langCategoryObj[key]}
        </MenuItem>
    ));

    let sexOptions = Object.keys(sexCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {sexCategoryObj[Number(key)]}
        </MenuItem>
    ));

    let birthOptions = Object.keys(birthCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {birthCategoryObj[Number(key)]}
        </MenuItem>
    ));

    let worldCountryOptions = Object.keys(worldCountryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {worldCountryObj[key]}
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
        const result = await dispatch(fetchAsyncUpdateThumbnail(editedThumbnail));
        if (fetchAsyncUpdateThumbnail.rejected.match(result)) {
            console.log(result)
            return false
        }
        if (fetchAsyncUpdateThumbnail.fulfilled.match(result)) {
            console.log(result);
            handleClose();
        }
    }

    const saveProfileAction = async () => {
        console.log("editedProfile", editedProfile)
        const result = await dispatch(fetchAsyncUpdateProfile(editedProfile));
        if (fetchAsyncUpdateProfile.rejected.match(result)) {
            console.log(result)
            return false
        }
        if (fetchAsyncUpdateProfile.fulfilled.match(result)) {
            handleLink('/');
        }
    };

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper}>
                <div className={customStyles.profile_user_settings_wrapper}>
                    <Typography variant="h6" className={classes.title}>プロフィール編集</Typography>
                    <div className={commonStyles.spacer__small} />
                    { editedThumbnail.imageFile ?
                        (<Avatar variant="rounded" src={editedThumbnail.imageFile} className={classes.avatar} alt="thumbnail" />)
                        : (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />)
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        className={classes.editPictureButton}
                        disableElevation
                    >
                        サムネイル画像
                    </Button>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title">
                            画像を編集する
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                ファイルのサイズが1Mより小さいjpg/jpeg, png画像ファイルを選び、アップロードしてください。
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
                            <Button autoFocus onClick={handleEditThumbnail} color="primary">
                                アップロード
                            </Button>
                            <Button onClick={saveThumbnailAction} color="primary">
                                保存
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className={commonStyles.spacer__medium} />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            name="lang"
                            value={editedProfile.lang}
                            onChange={handleSelectLangChange}
                        >
                            {langOptions}
                        </Select>
                    </FormControl>
                    <div className={commonStyles.spacer__medium} />
                    <TextField
                        variant="outlined"
                        label="ユーザーネーム"
                        type="text"
                        name="username"
                        value={editedProfile.username}
                        className={classes.textField}
                        onChange={handleInputChange}
                    />
                    <div className={commonStyles.spacer__medium} />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="sex-select-label">性別</InputLabel>
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
                        <InputLabel id="birth-select-label">生年</InputLabel>
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
                        <InputLabel id="country-select-label">国</InputLabel>
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
                            onClick={() => handleLink('/')}
                            disableElevation
                        >
                            戻る
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.nextStepButton}
                            onClick={saveProfileAction}
                            disabled={isDisabledProfile}
                            disableElevation
                        >
                            登録
                        </Button>
                    </div>
                </div>

            </Paper>
        </Container>
    )
}

export default ProfileEdit
