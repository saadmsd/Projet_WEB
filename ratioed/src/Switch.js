import React from 'react';

function Switch(props){

    //Bouton pour basculer de la page principale à la page de connexion et inversement
    const {page, setPage, currentUser, setCurrentUser, setSelectedUser, selectedUser} = props;

    const switchPage = () => {
        if (page === "profil_page") {
            setSelectedUser(null);
            setPage("message_page");
        } else if (page === "message_page"){
            setSelectedUser(currentUser)
            setPage("profil_page");
        }
    }

    return (
        <div className='switch'>
            {(page === "message_page") ? 
                <button className="button" onClick={switchPage}>
                    <img src="user.png" alt="Profil"/>
                    Mon Profil
                </button> 
            :   <button className="button" onClick={switchPage}>
                    <img src="home.png" alt="Accueil"/>
                    Accueil
                </button>}
            {page === "message_page" || page === "profil_page" ? 
                <button onClick={() => setPage("notif_page")}>
                    <img src="alarm.png" alt="Notifications"/>
                    Notifications
                </button> 
            : null}
        </div>
    );         
}

export default Switch;
