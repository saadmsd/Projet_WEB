import {useState} from 'react';
import NavigationPanel from './NavigationPanel';
import ListeCommentaire from './ListeCommentaire';
import Switch from './Switch';
import Stats from './Stats';
import "./style/PagePrincipal.css"
import Marquee from "react-fast-marquee";

function PagePrincipal(props){
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;

    return (
        <div className='principal'> 
            <NavigationPanel isConnected={isConnected} login={login} logout={logout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <Marquee speed="100" className="defile" autoFill={true}>
                <img src="barca.gif" alt="Barça" />
                <p className="defile-text"> Bienvenue sur Ratio'ed {currentUser} ! </p>
                <img src="psg.gif" alt="PSG" />
            </Marquee>
            <h1>Accueil</h1>
            <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
            <div className="main_content">
                <Stats></Stats>
                <ListeCommentaire currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </div>
    );
}

export default PagePrincipal;


