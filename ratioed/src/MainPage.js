import { useState } from 'react';
import PagePrincipal from './PagePrincipal';
import PageConnexion from './PageConnexion';
import PageProfil from './PageProfil';
import PageNotif from './PageNotif';
import axios from 'axios';

function MainPage (props) {
    const [isConnected, setConnect] = useState(false);
    const [page, setPage] = useState("signin_page");
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [Mypage, setMypage] = useState(false);

    const getConnected = () =>{
        setConnect(true);
        setPage("message_page");
    }

    const setLogout = () => {
        setConnect(false);
        setPage("signin_page");
    }

    const getProfile = () => {
        if (page === "message_page"){
            setPage("profil_page");
        }
    }

    const handleProfile = (commentaire) => {
        const configuration = {
            method: "GET",
            url: "/api/user/"+commentaire.auteur,
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setSelectedUser(commentaire.auteur);
                setPage("profil_page");
                if (currentUser === commentaire.auteur){
                    setMypage(true);
                } else {
                    setMypage(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className='main'>
            {isConnected === false 
            ? <PageConnexion isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> 
            : (isConnected === true && page === "message_page")
                ? <PagePrincipal isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                : (isConnected === true && page === "profil_page")
                    ?<PageProfil isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                    : (isConnected === true && page === "notif_page")
                        ?<PageNotif isConnected={isConnected} page={page} login={getConnected} logout={setLogout} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/> 
                        : null}
        </div>
    );
}
export default MainPage;
