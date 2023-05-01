import React, { useState,useEffect } from 'react';
import "./style/Switch.css"

function Switch(props){

    //Bouton pour basculer de la page principale à la page de connexion et inversement
    const {page, setPage, currentUser, setCurrentUser, setSelectedUser, selectedUser} = props;
    const [activeButton, setActiveButton] = useState(1);

    useEffect(() => {
        if (page === "message_page") {
          setActiveButton(1);
        } else if (page === "profil_page") {
          setActiveButton(2);
        } else if (page === "notif_page") {
          setActiveButton(3);
        }
      }, [page]);

    const switchPage = (pg) => {
        if (pg === "message_page") {
            setSelectedUser(null)
            setPage(pg);
        } 
        else if (pg === "profil_page"){
            setSelectedUser(currentUser)
            setPage(pg);
        }
        else if (pg === "notif_page"){
            setSelectedUser(null);
            setPage(pg);
        }
    }

    return (
        <div className='switch'>

            <button className={activeButton === 1 ? "switch-yes" : "switch-no"} onClick={() => switchPage("message_page")}>
                <img src="home.png" alt="Accueil"/>
                Accueil
            </button>

            <button className={activeButton === 2 ? "switch-yes" : "switch-no"} onClick={() => switchPage("profil_page")}>
                <img src="user.png" alt="Profil"/>
                Mon Profil
            </button> 

            <button className={activeButton === 3 ? "switch-yes" : "switch-no"} onClick={() => switchPage("notif_page")}>
                <img src="alarm.png" alt="Notifications"/>
                Notifications
            </button> 

        </div>
    );         
}

export default Switch;
