import {useState} from 'react';
import NavigationPanel from './NavigationPanel';
import ListeCommentaire from './ListeCommentaire';


function PagePrincipal(props){
    const {isConnected, login, logout} = props;

    const getConnected = () =>{
        login();
    }

    const setLogout = () => {
        logout();
    }

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
        </div>
    );
}

export default PagePrincipal;


