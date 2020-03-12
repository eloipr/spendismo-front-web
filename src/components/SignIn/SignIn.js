import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";

const SignIn = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <a className="fb-button" href="http://localhost:4000/auth/facebook">
                <FacebookIcon fontSize="large"></FacebookIcon>
            </a>
        </div>
    );
};

export default SignIn;
