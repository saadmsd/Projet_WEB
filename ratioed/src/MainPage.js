import { useState } from 'react';
import PagePrincipal from './PagePrincipal';
import PageConnexion from './PageConnexion';
import PageProfil from './PageProfil';
import axios from 'axios';

function MainPage (props) {
    const [isConnected, setConnect] = useState(false);
    const [page, setPage] = useState("signin_page");
    const [currentUser, setCurrentUser] = useState(null);

    const getConnected = () =>{
        setConnect(true);
        setPage("message_page");
    }

    const setLogout = () => {
        setConnect(false);
        setPage("signin_page");
    }

    return (
        <div>
            {isConnected === false 
            ? <PageConnexion isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> 
            : (isConnected === true && page === "message_page")
                ? <PagePrincipal isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                : (isConnected === true && page === "profil_page")
                    ?<PageProfil isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage}/>
                    : null}
        </div>
    );
}
export default MainPage;
