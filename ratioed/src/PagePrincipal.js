import {useState} from 'react';
import NavigationPanel from './NavigationPanel';
import Bottom from './Bottom';
import ListeCommentaire from './ListeCommentaire';

function PagePrincipal(props){
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser} = props;

    const getConnected = () =>{
        login();
    }

    const setLogout = () => {
        logout();
    }

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <h1>Page Principal</h1><ListeCommentaire/>
            <Bottom page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
    );
}

export default PagePrincipal;


