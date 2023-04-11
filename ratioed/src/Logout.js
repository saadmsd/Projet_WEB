import React from 'react';
import axios from 'axios';

function Logout (props) {
    const {logout} = props;

    const setLogout = () => {
        axios.get('/api/logout')
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
        logout();
    }



    return (    
        <div>
            <button className="button" onClick={setLogout}>logout</button>
        </div>
    );
}
export default Logout;