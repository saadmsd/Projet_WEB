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
            {(page === "message_page") ? <button className="button" onClick={switchPage}>Mon Profil</button> : <button className="button" onClick={switchPage}>Page Principale</button>}
            {page === "message_page" || page === "profil_page" ? <button className="button" onClick={() => setPage("notif_page")}>Notifications</button> : null}
        </div>
    );         
}

export default Switch;
