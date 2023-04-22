import React from 'react';
import Login from './Login';
import Logout from './Logout';
import SearchBar from './SearchBar';
import './style/NavigationPanel.css';

function NavigationPanel(props) {

  const {currentUser,setCurrentUser, getProfile, handleProfile, selectedUser, setSelectedUser} = props;

  return (
    <div>
        <nav id="navigation_pan">
          <img src="logo.gif" alt="Logo de Ratioed" />
            {(props.isConnected) ? 
            <div>
                <SearchBar id="form" currentUser={currentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                <Logout logout={props.logout} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>
            :<Login login={props.login} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
        </nav>
    </div>
  );
}

export default NavigationPanel;

