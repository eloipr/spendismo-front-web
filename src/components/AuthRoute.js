import React from "react";
import auth from "../services/auth";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/sign-in",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default AuthRoute;
