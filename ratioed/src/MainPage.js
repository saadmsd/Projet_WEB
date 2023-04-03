import { useState } from 'react';
import PagePrincipal from './PagePrincipal';
import PageConnexion from './PageConnexion';
import PageProfil from './PageProfil';
import Switch from './Switch';

function MainPage (props) {
    const [isConnected, setConnect] = useState(true);
    const [page, setPage] = useState("message_page");

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
            ? <PageConnexion isConnected={isConnected} login={getConnected} logout={setLogout} /> 
            : (isConnected === true && page === "message_page")
                ? <PagePrincipal isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage} />
                : (isConnected === true && page === "profil_page")
                    ?<PageProfil isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage}/>
                    : null}
        </div>
    );
}
export default MainPage;
