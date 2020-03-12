import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
            {authenticated && <ExitToAppIcon className="logout-button" onClick={onLogoutClick}></ExitToAppIcon>}
        </div>
    );
};

export default Header;
