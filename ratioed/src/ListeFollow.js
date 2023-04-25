import React, { useState, useEffect } from "react";
import axios from "axios";

function ListeFollow(props) {
    const { currentUser, selectedUser, setSelectedUser, page, setPage, handleProfile, getProfile } = props;
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        getFollowData();
    }, [selectedUser]);

    const getFollowData = () => {
        const configFollowing = {
            method: "GET",
            url: "/api/user/" + selectedUser + "/following",
        };
        const configFollowers = {
            method: "GET",
            url: "/api/user/" + selectedUser + "/followers",
        };
        axios.all([axios(configFollowing), axios(configFollowers)])
            .then(axios.spread((followingRes, followersRes) => {
                setFollowing(followingRes.data.following);
                setFollowers(followersRes.data.followers);
            }))
            .catch((error) => {
                console.log(error);
            });
    }

    const handleFollow = (user) => {
        const configuration = {
        method: "PUT",
        url: "/api/user/" + currentUser + "/follow",
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
            <button onClick={() => handleFollow(selectedUser)}>
                {followers.includes(currentUser) ? "Unfollow" : "Follow"}
            </button>
            </div>
        ) : null}
        <div>
            <h2>Following</h2>
            <ul>
            {following.map((user) => (
                <li key={user}>
                <button onClick={() => setSelectedUser(user)}>
                    {user}
                </button>
                </li>
            ))}
            </ul>
        </div>
        <div>
            <h2>Followers</h2>
            <ul>
            {followers.map((user) => (
                <li key={user}>
                <button onClick={() => setSelectedUser(user)}>
                    {user}
                </button>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}

export default ListeFollow;
