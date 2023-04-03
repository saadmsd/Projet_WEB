import React from 'react';

function Logout (props) {
    const {logout} = props;

    const setLogout = () => {
        logout();
    }

    return (    
        <div>
            <button className="button" onClick={setLogout}>logout</button>
        </div>
    );
}
export default Logout;