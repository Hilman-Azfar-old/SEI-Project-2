import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import auth from './Auth'
import PropTypes from 'prop-types'

function ProtectedRoute({ component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={ props  => {
                if (auth.isAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect
                    to = {{
                        pathname: "/user/login"
                    }}
                  />
                }
            }}
        />
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
}

export default ProtectedRoute;