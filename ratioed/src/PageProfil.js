import { useState } from 'react';
import NavigationPanel from './NavigationPanel';
import ListeCommentaire from './ListeCommentaire';
import Bottom from './Bottom';

function PageProfil (props) {
    const { isConnected, login, logout, page } = props;

    const getConnected = () => {
        login();
    };  

    const setLogout = () => {
        logout();
    };

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
            
            <Bottom page={page}/>
        </div>
    );
}

export default PageProfil;