import { useState, useEffect } from 'react';
import axios from "axios";
import NavigationPanel from './NavigationPanel';
import Switch from './Switch';
import ListeCommentaire from './ListeCommentaire';
import ListeFollow from './ListeFollow';

function PageProfil (props) {
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
    const [isFollowing, setIsFollowing] = useState(false);


    const getConnected = () => {
        login();
    };  

    const setLogout = () => {
        logout();
    };

    useEffect(() => {
        checkIsFollowing();
    }, []);
    
    const checkIsFollowing = () => {
        const configuration = {
            method: "GET",
            url: "/api/user/" + currentUser + "/following",
        };
        axios(configuration)
            .then((response) => {
            setIsFollowing(response.data.includes(selectedUser));
            })
            .catch((error) => {
            console.log(error);
            });
    };

    const handleFollowToggle = () => {
        const configuration = {
            method: isFollowing ? "PUT" : "POST",
            url: "/api/user/" + currentUser + "/follow-toggle",
            data: {
            user: selectedUser,
            },
        };
        axios(configuration)
            .then((response) => {
            setIsFollowing(!isFollowing);
            })
            .catch((error) => {
            console.log(error);
            });
    };
    
    return (
        <div>
            <NavigationPanel isConnected={isConnected} login={getConnected} logout={setLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <h1>Page Profil</h1>
            <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
            {currentUser === selectedUser ? (
                <h2>Vous êtes sur votre profil</h2>
            ) : (
                <div>
                    <h2>Vous êtes sur le profil de {selectedUser}</h2>
                    {isFollowing ? (
                    <button onClick={handleFollowToggle}>Se désabonner</button>
                    ) : (
                    <button onClick={handleFollowToggle}>S'abonner</button>
                    )}
                </div>
            )}

            <ListeFollow currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <ListeCommentaire currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>
    );
}

export default PageProfil;