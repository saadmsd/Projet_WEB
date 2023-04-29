import React, { useState, useEffect } from "react";
import Login from './Login';
import Logout from './Logout';
import SearchBar from './SearchBar';

import './style/NavigationPanel.css';

function NavigationPanel(props) {

  const {currentUser,setCurrentUser, getProfile, handleProfile, selectedUser, setSelectedUser} = props;
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 1;
      if (scrollCheck !== isTop) {
        setIsTop(scrollCheck);
      }
    });
  });
  return (
    <div>
        <nav  className={isTop ? "top" : "scrolled"} id="navigation_pan">
          <img src="colo.ico" alt="Logo de Ratioed" />
            {(props.isConnected) ? 
            <div className='top-right'>
                <SearchBar id="form" currentUser={currentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                <Logout logout={props.logout} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>
            :<Login login={props.login} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
        </nav>
    </div>
  );
}

export default NavigationPanel;

