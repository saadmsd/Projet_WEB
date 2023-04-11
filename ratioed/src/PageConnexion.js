import React from "react";
import NavigationPanel from "./NavigationPanel";
import Signup from "./Signup";
import axios from "axios";

function PageConnexion(props) {
    const { isConnected, login, logout, userCurrent , setCurrentUser } = props;

    const getConnected = () => {
        login();
    };

    const setLogout = () => {
        logout();
    };

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout} userCurrent={userCurrent} setCurrentUser={setCurrentUser} />
            <Signup />
        </div>
    );
}

export default PageConnexion;
