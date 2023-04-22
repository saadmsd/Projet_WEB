import {useState} from 'react';
import NavigationPanel from './NavigationPanel';
import ListeCommentaire from './ListeCommentaire';
import Switch from './Switch';

function PagePrincipal(props){
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;

    const getConnected = () =>{
        login();
    }

    const setLogout = () => {
        logout();
    }

    return (
        <div> 
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <h1>Page Principal</h1>
            <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
            <ListeCommentaire currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>
    );
}

export default PagePrincipal;


