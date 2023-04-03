import React from 'react';
import Login from './Login';
import Logout from './Logout';
import SearchBar from './SearchBar';
import './NavigationPanel.css';

function NavigationPanel(props) {
  return (
    <div>
        <nav id="navigation_pan">
          <img src="logo192.png" alt="Logo de Ratioed" />
            {(props.isConnected) ? 
            <div>
                <SearchBar id="form"/>
                <Logout logout={props.logout}/>
            </div>
            :<Login login={props.login}/>}
        </nav>
    </div>
  );
}

export default NavigationPanel;

