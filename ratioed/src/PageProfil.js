import { useState } from 'react';
import NavigationPanel from './NavigationPanel';
import Bottom from './Bottom';

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
            <Bottom page={page} setPage={setPage}/>
        </div>
    );
}

export default PageProfil;