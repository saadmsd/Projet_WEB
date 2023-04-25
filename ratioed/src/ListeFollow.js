import { useState, useEffect } from "react";
import axios from "axios";

function ListeFollow(props) {
  const { currentUser, selectedUser, setSelectedUser, page, setPage, handleProfile, getProfile } = props;
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getFollowData();
  }, [selectedUser]);

  const getFollowData = () => {
    const configuration = {
      method: "GET",
      url: "/api/user/" + selectedUser + "/follow-data",
    };
    axios(configuration)
      .then((response) => {
        setFollowing(response.data.following);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFollowToggle = (user, isFollowing) => {
    const method = isFollowing ? "DELETE" : "PUT";
    const configuration = {
      method: method,
      url: "/api/user/" + currentUser + "/follow-toggle",
      data: {
        user: user,
      },
    };
    axios(configuration)
      .then((response) => {
        console.log(response);
        getFollowData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {page === "profil_page" && selectedUser !== currentUser ? (
        <div>
          <h2>Abonnements</h2>
          {following.map((user) => (
            <div key={user}>
              <p>{user}</p>
              <button onClick={() => handleFollowToggle(user, true)}>Se désabonner</button>
            </div>
          ))}
          <h2>Abonnés</h2>
          {followers.map((user) => (
            <div key={user}>
              <p>{user}</p>
              <button onClick={() => handleFollowToggle(user, false)}>S'abonner</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Abonnements</h2>
          {following.map((user) => (
            <div key={user}>
              <p onClick={() => { setSelectedUser(user); setPage("profil_page"); handleProfile(user); }}>{user}</p>
            </div>
          ))}
          <h2>Abonnés</h2>
          {followers.map((user) => (
            <div key={user}>
              <p onClick={() => { setSelectedUser(user); setPage("profil_page"); handleProfile(user); }}>{user}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListeFollow;
