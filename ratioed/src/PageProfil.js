import { useEffect, useState } from 'react';
import NavigationPanel from './NavigationPanel';
import Switch from './Switch';
import ListeCommentaire from './ListeCommentaire';
import ListeFollow from './ListeFollow';
import "./style/PageProfil.css"
import axios from 'axios';

function PageProfil (props) {
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
    const [ratio, setRatio] = useState(0);
    const [ratioed, setRatioed] = useState(0);

    const getConnected = () => {
        login();
    };  

    const setLogout = () => {
        logout();
    };

    useEffect(() => {
        getStats();
    }, []);


    const getStats = () => {
        const configuration = {
            method: "GET",
            url: "/api/stats/" + currentUser,
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setRatio(response.data.result.cptRatio);
                setRatioed(response.data.result.cptRatioed);
            })
            .catch((error) => {
                console.log(error);
            });
    }

        

    return (
        <div className='profil'>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <h1>Page Profil</h1>
            {(currentUser === selectedUser) ? <h2>Vous êtes sur votre profil</h2> : <h2>Vous êtes sur le profil de {selectedUser}</h2>}
            <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
            <div className="main_content">
            <div className="stats">
                <h3>Statistiques</h3>
                <p>Ratio : {ratio}</p>
                <p>Ratioed : {ratioed}</p>
            </div>
            <ListeFollow currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <ListeCommentaire currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </div>
    );
}

export default PageProfil;