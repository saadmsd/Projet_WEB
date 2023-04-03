import React from "react";
import NavigationPanel from "./NavigationPanel";
import Signup from "./Signup";

function PageConnexion(props) {
    const { isConnected, login, logout } = props;

    const getConnected = () => {
        login();
    };

    const setLogout = () => {
        logout();
    };

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
            <Signup />
        </div>
    );
}

export default PageConnexion;
