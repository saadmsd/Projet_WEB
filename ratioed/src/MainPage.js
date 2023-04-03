import { useState } from 'react';
import NavigationPanel from './NavigationPanel';   
import Signup from './Signup';
import PagePrincipal from './PagePrincipal';

function MainPage (props) {
    const [isConnected, setConnect] = useState(false);
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
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
            {(page === "signin_page") && (isConnected===false)  ? <Signup login={getConnected}/> : <PagePrincipal> </PagePrincipal>}
        </div>
    );
}
export default MainPage;
