import React, { useState, useEffect } from "react";
import Commentaire from "./Commentaire";
import NewComment from "./NewComment";
import axios from "axios";

function ListeCommentaire(props) {
    
    const {currentUser, page, setPage, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
    const [commentaires, setCommentaires] = useState([]);
    const [req,setReq] = useState(false);

    
    useEffect(() => {
        getCommentaires();
    }, []);

    const getCommentaires = () => {
        const configuration = {
            method: "GET",
            url: "/api/commentaire/",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setCommentaires([]);
                setCommentaires(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });    

        setReq(true);
    };

    
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    
    return (
        <div>
            <h2>Commentaires</h2>
            <NewComment id="NC" currentUser={currentUser} getCommentaires={getCommentaires} />
            {commentaires.filter(commentaire => selectedUser ? commentaire.auteur === selectedUser : true).map((commentaire) => (
                <ul>
                    <Commentaire key={commentaire.id} commentaire={commentaire} formatDate={formatDate} currentUser={currentUser} getProfile={getProfile} page={page} setPage={setPage} handleProfile={handleProfile} getCommentaires={getCommentaires} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                </ul>
            ))}

        </div>
    );

}

export default ListeCommentaire;
