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
        if(page === "profile_page" && selectedUser === commentaire.auteur){
            alert("Vous êtes déjà sur votre profil");
        }else{
            getProfile();
            setSelectedUser(commentaire.auteur);
        }
        
    }

    const handleDelete = () => {
        //supprimer le commentaire et les reponses associees en envoyant 2 axios
        const configuration = {
            method: "DELETE",
            url: "/api/commentaire/"+commentaire._id,
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                props.getCommentaires();
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );

        const configuration2 = {
            method: "DELETE",
            url: "/api/commentaire/reponse/"+commentaire.id,
        };
        axios(configuration2)
            .then((response) => {
                console.log(response);
                props.getCommentaires();
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );

    }


    return (
        <div className="commentaire">
            <h3>
                <span className ="click" onClick={handleProfileClick}>{commentaire.auteur}</span>
            </h3>
            <p name="text">{commentaire.texte}</p>
            <p name='date'>{props.formatDate(commentaire.date)}</p>
            <p name="likes">{commentaire.nbLike}
            <button onClick={handleLike}>
                <img src="pngwing.png" alt="like" />
            </button>
            </p>
            {answer === false ? <button onClick={handleAnswer}>Répondre</button> : <button onClick={handleAnswer}>Annuler</button>}
            <Reponse currentUser={currentUser} commentaire={commentaire} reponses={reponses} setReponses={setReponses} getReponses={getReponses} handleDelete={handleDelete} />
            {currentUser === commentaire.auteur ? <button onClick={handleDelete}>Supprimer</button> : null}
        </div>
    );

}

export default Commentaire;
