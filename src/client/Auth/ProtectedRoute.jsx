import React from 'react';
import { Route, Redirect, useParams } from 'react-router-dom'
import auth from './Auth'
import PropTypes from 'prop-types'

function ProtectedRoute({ children, ...rest }) {
    let { user } = useParams();
    return (
        <Route
            {...rest}
            render={({ location }) =>{
                if (auth.isAuthenticated()) {
                    return (children)
                } else {
                    return (<Redirect
                    to = {{
                        pathname: "/user/login"
                    }}
                  />)
                }
            }}
        />
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.any.isRequired,
}

export default ProtectedRoute;