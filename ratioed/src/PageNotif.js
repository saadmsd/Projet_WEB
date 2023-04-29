import React, { useState, useEffect } from "react";
import axios from "axios";

function PageNotif(props) {
  const { page, setPage, currentUser, setCurrentUser } = props;
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getComments();
    getFollowers();
  }, []);

  const getComments = () => {
    const configuration = {
      method: "GET",
      url: "/api/user/comments/" + currentUser,
    };
    axios(configuration)
      .then((response) => {
        console.log(response);
        setComments(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = (() => {
    const configuration = {
        method: "GET",
        url: "/api/user/"+currentUser,
    };
    axios(configuration)
        .then((response) => {
            console.log(response);
            setUser(response.data.result);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    const getFollowers = () => {
        const followingUrl = `/api/user/${currentUser}/following`;
        axios.get(followingUrl)
          .then((response) => {
            const following = response.data.following.map(user => user.login);
            const followersUrl = `/api/user/${currentUser}/followers`;
            axios.get(followersUrl)
              .then((response) => {
                const currentFollowers = response.data.followers.map(user => user.login);
                const newFollowers = currentFollowers.filter(follower => !following.includes(follower));
                setFollowers(newFollowers);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      };



  const getLikedBy = (comment) => {
    let likedByString = comment.likedBy.join(", ");
    let lastCommaIndex = likedByString.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      likedByString = likedByString.slice(0, lastCommaIndex) + " et" + likedByString.slice(lastCommaIndex + 1);
    }
    return likedByString ;
  };

  
  

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.texte}</p>
          {comment.nbLike > 0 && (
            <div>
                {comment.nbLike === 1 ? <p>{`${comment.nbLike} personne a aimé votre commentaire.`}</p> : <p>{`${comment.nbLike} personnes ont aimé votre commentaire.`}</p>}
                {comment.nbLike === 1 ? <p>{`${getLikedBy(comment)} a aimé votre commentaire.`}</p> : <p>{`${getLikedBy(comment)} ont aimé votre commentaire.`}</p>}
            </div>
          )}
        </div>
      ))}
        <div>
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
  );
}

export default PageNotif;
