import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import _ from 'lodash';


const PrivateRouteUser: React.FC<RouteProps> = props => {
    // permit routes access if the local storage has JWT token
    const isSignedIn = Boolean(localStorage.localJWT)
    const rest = _.omit(props, ['component']);

    return (
        <Route
            {...rest}
            render={innerProps =>
                isSignedIn ? (
                    <Route {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: innerProps.location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRouteUser;