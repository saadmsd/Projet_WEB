import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationPanel from "./NavigationPanel";
import Switch from "./Switch";import "./style/PageNotif.css";


function PageNotif(props) {
  const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
  const [user, setUser] = useState(null);
  const [notifs,setNotifs] = useState([]);

  useEffect(() => {
    getUser();
  }, [page]);

  const getUser = () => {
    const configuration = {
      method: "GET",
      url: "/api/user/" + currentUser,
    };
    axios(configuration)
      .then((response) => {
        setNotifs(response.data.result.notifs);
        console.log(notifs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  

  return (
    <div className="notif">
      <NavigationPanel isConnected={isConnected} login={login} logout={logout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <h1>Notifications</h1>
      <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
      <div className="main_content">
      <ul>
      {notifs && notifs.map((notif) => (
          <li key="notif">{notif}</li>
      ))}
      </ul>
      </div>
    </div>
  );
}

export default PageNotif;
