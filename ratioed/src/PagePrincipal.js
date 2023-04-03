import {useState} from 'react';
import NavigationPanel from './NavigationPanel';
import ListeCommentaire from './ListeCommentaire';


function PagePrincipal(props){
    const {isConnected,page, login, logout} = props;

    const getConnected = () =>{
        login();
    }

    const setLogout = () => {
        logout();
    }

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
            <Bottom page={page}/>
        </div>
    );
}

export default PagePrincipal;


