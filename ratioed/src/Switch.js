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
        <div>
            {(page === "message_page") ? <button className="button" onClick={switchPage}>Mon Profil</button> : <button className="button" onClick={switchPage}>Page Principale</button>}
        </div>
    );         
}

export default Switch;
