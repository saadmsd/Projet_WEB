import React from 'react';

function Switch(props){

    //Bouton pour basculer de la page principale à la page de connexion et inversement
    const {page, setPage, currentUser, setCurrentUser, setSelectedUser, selectedUser} = props;

    const switchPage = (pg) => {
        if (pg === "profil_page") {
            setSelectedUser(currentUser)
            setPage(pg);
        } 
        else {
            setSelectedUser(null);
            setPage(pg);
        }
    }

    return (
        <div className='switch'>

            <button className="button" onClick={() => switchPage("message_page")}>
                <img src="home.png" alt="Accueil"/>
                Accueil
            </button>

            <button className="button" onClick={() => switchPage("profil_page")}>
                <img src="user.png" alt="Profil"/>
                Mon Profil
            </button> 

            <button className="button" onClick={() => setPage("notif_page")}>
                <img src="alarm.png" alt="Notifications"/>
                Notifications
            </button> 

        </div>
    );         
}

export default Switch;
