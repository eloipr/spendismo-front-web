import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./../Dashboard/Dashboard";
import SignIn from "./../SignIn/SignIn";
import Header from "./../Header/Header";
import AuthRoute from "./../AuthRoute";
import AuthContext from "./../../AuthContext";
import { isAuthenticated, logout } from "./../../services/auth";

const App = () => {
    const [authenticated, setAuthenticated] = useState();
    useEffect(() => {
        isAuthenticated().subscribe(res => setAuthenticated(res.isAuthenticated));
    }, []);

    const handleLogout = () => {
        logout().subscribe(res => {
            setAuthenticated(false);
        });
    };

    return (
        <AuthContext.Provider value={authenticated}>
            <BrowserRouter>
                <Header handleLogout={handleLogout}></Header>
                <Switch>
                    <AuthRoute exact path="/">
                        <Dashboard></Dashboard>
                    </AuthRoute>
                    <Route path="/sign-in">
                        <SignIn></SignIn>
                    </Route>
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
