import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./../AuthContext";

const AuthRoute = ({ children, ...rest }) => {
    const authenticated = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={() => {
                if (authenticated === undefined) {
                    return <div>Loading</div>;
                } else if (authenticated) {
                    return children;
                } else {
                    return <Redirect to="/sign-in" />;
                }
            }}
        />
    );
};

export default AuthRoute;
