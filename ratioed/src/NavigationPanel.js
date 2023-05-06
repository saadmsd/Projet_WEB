import React, { useState, useEffect } from "react";
import Login from './Login';
import Logout from './Logout';
import SearchBar from './SearchBar';
import Marquee from "react-fast-marquee";
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

  const avatar = "https://robohash.org/"+currentUser+".png";
  return (
    <div className="navigation_pan">
        <nav  className={isTop ? "top" : "scrolled"} id="navigation_pan">
          <img src="logo.jpeg" alt="Logo de Ratioed" />
            {(props.isConnected) ? 
            <div className='topC'>
              <div className='top-right'>
                  <SearchBar id="form" currentUser={currentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                  <div className="profilNav">
                    <img src={avatar} alt="Avatar"/>
                    <span className="username">{currentUser}</span>
                  </div>
                  <Logout logout={props.logout} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
              </div>
            </div>
            :<Login login={props.login} currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
        </nav>
    </div>
  );
}

export default NavigationPanel;

