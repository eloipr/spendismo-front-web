import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Header.scss";
import AuthContext from "./../../AuthContext";

const Header = ({ handleLogout }) => {
    const authenticated = useContext(AuthContext);
    const history = useHistory();

    const onLogoutClick = () => {
        history.push("/sign-in");
        handleLogout();
    };

    return (
        <div className="header">
            <div className="title">Spendismo</div>
            {authenticated && (
                <div className="user-info" onClick={onLogoutClick}>
                    Logout
                </div>
            )}
        </div>
    );
};

export default Header;
