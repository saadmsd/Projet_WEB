import React, { useState, useEffect } from "react";
import Commentaire from "./Commentaire";
import NewComment from "./NewComment";
import axios from "axios";
import "./style/ListeCommentaire.css";

function ListeCommentaire(props) {
    
    const {currentUser, page, setPage, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
    const [commentaires, setCommentaires] = useState([]);
    const [req,setReq] = useState(false);

    
    useEffect(() => {
        getCommentaires();
    }, [page, selectedUser]);

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
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        return new Date(date).toLocaleDateString('fr-FR', options);
    }




    
    return (
        <div className="box">
            <h2>Commentaires</h2>
            {page !== "profil_page" || selectedUser === currentUser ? (
                <NewComment id="NC" currentUser={currentUser} getCommentaires={getCommentaires} />
            ) : null}
            <button name="refresh" onClick={getCommentaires}>Rafraîchir</button>
            <ul className="boxComs">
                {commentaires.filter(commentaire => selectedUser ? commentaire.auteur === selectedUser : true).map((commentaire) => (
                    <li key={commentaire._id} >
                    <Commentaire commentaire={commentaire} formatDate={formatDate} currentUser={currentUser} getProfile={getProfile} page={page} setPage={setPage} handleProfile={handleProfile} getCommentaires={getCommentaires} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                    </li>
                ))}
            </ul>


        </div>
    );

}

export default ListeCommentaire;
