import React from 'react';
import axios from 'axios';

function Logout (props) {
    const {logout, currentUser, setCurrentUser} = props;

    const setLogout = () => {
        const configuration = {
            method: "GET",
            url: "/api/logout/",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setCurrentUser(null);
                logout();
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });
    }




    return (    
        <div className='logout'>
            <button className="button" onClick={setLogout}>Se déconnecter</button>
        </div>
    );
}
export default Logout;