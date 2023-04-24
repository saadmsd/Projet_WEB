import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Commentaire from "./Commentaire";


function Reponse(props){
    
    const {currentUser, commentaire, reponses, setReponses ,getReponses} = props;
    const [reponse, setReponse] = useState("");
    //const [reponses, setReponses] = useState([]);
    const [like, setLike] = useState(false);
    const [ratio, setRatio] = useState(false);


    useEffect(() => {
        getReponses();
    }, []);

    const handleReponse = () => {
        // Envoyer la réponse à l'aide d'une requête axios
        const configuration = {
            method: "POST",
            url: "/api/commentaire/reponse/"+commentaire.id,
            data: {
                auteur: currentUser,
                texte: reponse,
                date: new Date(),
                nbLike: 0,
                likedBy: [],
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                console.log("reponse");
                setReponse("");
                // Mettre à jour la liste des réponses avec la nouvelle réponse
                setReponses([...reponses, response.data.result]);
                getReponses();
            })
            .catch((error) => {
                console.log("error");
            });
    }
    

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    const handleLike = (rep) => {
        console.log(rep);
        if(like === false){
            if(rep.likedBy.includes(currentUser) === false){
                const configuration = {
                    method: "PUT",
                    url: "/api/commentaire/reponse/like/"+rep._id,
                    data: {
                        auteur: currentUser,
                        nbLike: rep.nbLike+1,
                    },
                };
                axios(configuration)
                    .then((response) => {
                        console.log(response.data.result);
                        setReponses(response.data.result);
                        setLike(true);                     
                       })
                    .catch((error) => {
                        console.log(error);
                        console.log("error client");
                    });
            } else {
                setLike(true);
            }
        }
    }

    const handleDelete = (rep) => {
        const configuration = {
            method: "DELETE",
            url: "/api/commentaire/reponse/"+rep._id,
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setReponses(response.data.result);
            })
            .catch((error) => {
                console.log(error);
                console.log("error client");
            })
    }

    return(
        <div>
            <input type="text" placeholder="Votre reponse" onChange={(e) => setReponse(e.target.value)} value={reponse} name="reponse" />
                <button onClick={handleReponse}>Envoyer</button>
                {ratio === true ? <p>Le commentaire a été supprimé car il a été ratio</p> : null}
                {Array.isArray(reponses) && reponses.length > 0 ? (
                    reponses.map((rep) => (
                        <ul>
                        <li>
                            <h3>{rep.auteur}</h3>
                            <p>{rep.texte}</p>
                            <p>{formatDate(rep.date)}</p>
                            <p>{rep.nbLike} likes</p>
                            <button onClick={() => handleLike(rep)}>Like</button>
                            {currentUser === rep.auteur ? <button onClick={() => handleDelete(rep)}>Supprimer</button> : null}
                        </li>
                        </ul>
                    ))
                ) : (<p>Pas de réponse</p>)
                }

        </div>
    );

}

export default Reponse;

