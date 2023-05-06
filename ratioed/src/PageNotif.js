import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationPanel from "./NavigationPanel";
import Switch from "./Switch";
import "./style/PageNotif.css";


function PageNotif(props) {
  const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);



  const getUser



  
    

  
  

  return (
    <div className="notif">
      <NavigationPanel isConnected={isConnected} login={login} logout={logout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <h1>Notifications</h1>
      <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
      <div className="main_content">
        <div className="box">
          {comments.map((comment) => (
            <div key={comment._id} className="commentaire">
              {comment.nbLike > 0 && (
                <div>
                    <p>{comment.texte}</p>
                    {comment.nbLike === 1 ? <p>{`${comment.nbLike} personne a aimé votre commentaire.`}</p> : <p>{`${comment.nbLike} personnes ont aimé votre commentaire.`}</p>}
                    {comment.nbLike === 1 ? <p>{`${getLikedBy(comment)} a aimé votre commentaire.`}</p> : <p>{`${getLikedBy(comment)} ont aimé votre commentaire.`}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="aside">
          {followers.length > 0 && (
            <p>Nouveaux followers :</p>
          )}
          <ul>
            {followers.map((follower) => (
              <li key={follower}>
                {currentUser !== follower ? (
                  <span>
                    <span className="username">{follower}</span> vous a follow.
                  </span>
                ) : (
                  <span>Vous vous êtes follow vous-même ?!?</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PageNotif;
