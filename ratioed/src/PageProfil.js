import { useState } from 'react';
import NavigationPanel from './NavigationPanel';
import Switch from './Switch';
import ListeCommentaire from './ListeCommentaire';
import ListeFollow from './ListeFollow';
import "./style/PageProfil.css"

function PageProfil (props) {
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;


    const getConnected = () => {
        login();
    };  

    const setLogout = () => {
        logout();
    };

    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <h1>Page Profil</h1>
            <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
            {(currentUser === selectedUser) ? <h2>Vous êtes sur votre profil</h2> : <h2>Vous êtes sur le profil de {selectedUser}</h2>}
            <div className="main_content">
            <ListeFollow currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <ListeCommentaire currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </div>
    );
}

export default PageProfil;