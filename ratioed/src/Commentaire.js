import { useState } from "react";
import axios from "axios";
import Reponse from "./Reponse";
import PageProfil from "./PageProfil";
import { render } from "react-dom";
import "./style/Commentaire.css";


function Commentaire(props){

    const {currentUser, getProfile, page, setPage, selectedUser, setSelectedUser} = props;
    const [commentaire, setCommentaire] = useState(props.commentaire);
    const [like, setLike] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [reponses, setReponses] = useState([]);

    const getReponses = (e) => {
        const configuration = {
            method: "GET",
            url: "/api/commentaire/reponse/"+commentaire.id,
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setReponses(response.data.result);
                console.log("error get");

            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleLike = () => {
        //verifier si l'utilisateur a deja like
        
        if(like === false){
            if(commentaire.likedBy.includes(currentUser) === false){
                const configuration = {
                    method: "PUT",
                    url: "/api/commentaire/like/"+commentaire._id,
                    data: {
                        auteur: currentUser,
                        nbLike: commentaire.nbLike + 1,
                    },
                };
                axios(configuration)
                    .then((response) => {
                        console.log(response);
                        setCommentaire(response.data.result);
                        setLike(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setLike(true);
            }
        }
    }

    const handleAnswer = () => {
        
        if(answer === false){
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }

    const handleProfileClick = () => {
        if(page === "profile_page"){
            alert("Vous êtes déjà sur votre profil");
        }else{
            getProfile();
            setSelectedUser(commentaire.auteur);

        }
    }


    return (
        <div className="commentaire">
            <h3>
                <span className ="click" onClick={handleProfileClick}>{commentaire.auteur}</span>
            </h3>
            <p>{commentaire.texte}</p>
            <p>{props.formatDate(commentaire.date)}</p>
            <p>{commentaire.nbLike} likes</p>
            <button onClick={handleLike}>
            <img src="https://img.icons8.com/ios/50/000000/like--v1.png" alt="like" />
            </button>
            {answer === false ? <button onClick={handleAnswer}>Répondre</button> : <button onClick={handleAnswer}>Annuler</button>}
            {answer === true ? <div>
                <Reponse currentUser={currentUser} commentaire={commentaire} reponses={reponses} setReponses={setReponses} getReponses={getReponses} />
            </div> : null}
        </div>
    );

}

export default Commentaire;
