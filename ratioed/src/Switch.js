import React from 'react';

function Switch(props){

    //Bouton pour basculer de la page principal a la page de connexion et inversement
    const {page} = props;

    const switchPage = () => {
        if (page === "profil_page") {
            props.setPage("connexion_page");
        } else {
            props.setPage("profil_page");
        }
    }

    return (
        <div>
            {(props.page==="page_principal") ? <button className="button" onClick={switchPage}>Mon Profil</button> : <button className="button" onClick={switchPage}>Page Principal</button>}
        </div>
    );         

}

export default Switch;