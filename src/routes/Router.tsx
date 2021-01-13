import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserSignIn from '../features/user/auth/SignIn';
import UserSignUp from '../features/user/auth/SignUp';
import Top from '../features/user/spot/Top';
import SpotDetail from '../features/user/spot/SpotDetail';
import SpotSearch from '../features/user/spot/SpotSearch';
import ExhibitDetail from '../features/user/exhibit/ExhibitDetail';

import PrivateRouteUser from './PrivateRouteUser';
import NotFound from "../templates/NotFound";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={Top} />
            <Route exact path={"/spots/search"} component={SpotSearch} />
            <Route exact path={"/spots/detail"} component={SpotDetail} />
            <Route exact path={"/exhibits/detail"} component={ExhibitDetail} />
            <Route exact path={"/signin"} component={UserSignIn} />
            <Route exact path={"/signup"} component={UserSignUp} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Router;