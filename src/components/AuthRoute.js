import React from "react";
import auth from "../services/auth";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ children, ...rest }) => {
    return <Route {...rest} render={() => (auth.isAuthenticated ? children : <Redirect to="/sign-in" />)} />;
};

export default AuthRoute;
