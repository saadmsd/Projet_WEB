import { useState } from 'react';
import NavigationPanel from './NavigationPanel';
import Switch from './Switch';

function PageProfil (props) {
    const { isConnected, login, logout, page ,setPage } = props;

    const getConnected = () => {
        login();
    };  

    const setLogout = () => {
        logout();
    };

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
            <h1>Page Profil</h1>
            <Switch page={page} setPage={setPage}/>
        </div>
    );
}

export default PageProfil;