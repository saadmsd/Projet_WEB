import React from 'react';

function Switch(props){

    //Bouton pour basculer de la page principale à la page de connexion et inversement
    const {page, setPage} = props;

    const switchPage = () => {
        if (page === "profil_page") {
            setPage("message_page");
        } else if (page === "message_page"){
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
