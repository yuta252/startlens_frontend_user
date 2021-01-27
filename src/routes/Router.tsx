import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserSignIn from '../features/user/auth/SignIn';
import UserSignUp from '../features/user/auth/SignUp';
import Profile from '../features/user/auth/Profile';
import ProfileEdit from '../features/user/auth/ProfileEdit';
import Top from '../features/user/spot/Top';
import About from '../components/user/About/About';
import SpotDetail from '../features/user/spot/SpotDetail';
import SpotSearch from '../features/user/spot/SpotSearch';
import ExhibitDetail from '../features/user/exhibit/ExhibitDetail';
import FavoriteList from '../features/user/spot/FavoriteList';

import PrivateRouteUser from './PrivateRouteUser';
import NotFound from "../templates/NotFound";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={Top} />
            <Route exact path={"/about"} component={About} />
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/exhibits/detail"} component={ExhibitDetail} />
            <Route exact path={"/signin"} component={UserSignIn} />
            <Route exact path={"/signup"} component={UserSignUp} />
            <Route exact path={"/spots/detail"} component={SpotDetail} />
            <Route exact path={"/spots/search"} component={SpotSearch} />
            <PrivateRouteUser exact path={"/favorites"} component={FavoriteList} />
            <PrivateRouteUser exact path={"/profile/edit"} component={ProfileEdit} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Router;