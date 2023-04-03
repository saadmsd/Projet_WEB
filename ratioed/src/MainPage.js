import { useState } from 'react';
import NavigationPanel from './NavigationPanel';   
import Signup from './Signup';
import PagePrincipal from './PagePrincipal';
import PageConnexion from './PageConnexion';

function MainPage (props) {
    const [isConnected, setConnect] = useState(true);
    const [page, setPage] = useState("signin_page");

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
            {(page === "signin_page") && (isConnected===false)  ? <PageConnexion isConnected={isConnected} login={getConnected} logout={setLogout}/> :<PagePrincipal isConnected={isConnected} login={getConnected} logout={setLogout}/>}
        </div>
    );
}
export default MainPage;
