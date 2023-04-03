import {useState} from 'react';
import NavigationPanel from './NavigationPanel';
import Signup from './Signup';
import ListeCommentaire from './ListeCommentaire';


function PagePrincipal(props){
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
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout}/>
            <ListeCommentaire/>
        </div>
    );
}

export default PagePrincipal;


