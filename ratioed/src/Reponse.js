import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style/Reponse.css";
import "./style/Commentaire.css";
import Swal from 'sweetalert2'
function Reponse(props){
    
    const {currentUser, commentaire, reponses, setReponses ,getReponses, handleDelete} = props;
    const [reponse, setReponse] = useState("");
    //const [reponses, setReponses] = useState([]);
    const [like, setLike] = useState(false);
    const [ratio, setRatio] = useState(false);


    useEffect(() => {
        getReponses();
    }, [like, ratio, reponses]);

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
                //getReponses();
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
        const configuration = {
            method: "PUT",
            url: "/api/commentaire/reponse/like/" + rep._id,
            data: {
                auteur: currentUser,
                nbLike: rep.nbLike,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                //getReponses();
                setLike(response.data.like);
                const comLike = commentaire.nbLike;
                const repLike = response.data.result.nbLike;
                if (repLike > comLike && response.data.result.texte === "ratio") {
                handleDelete();
                setRatio(true);
                handleRatio(rep);
                Swal.fire({
                    title: 'RATIO!',
                    text: `HAHAHAHAHAHAHAHAHAHAHA TA REUSSI A RATIO CE PTIT BOUFFON DE ${commentaire.auteur}`,
                    color: 'red',
                    confirmButtonText: 'EZ',
                    position: 'center',
                    backdrop: `
                        rgba(123,0,0,0.4)
                        url("neymar.gif")
                        center top
                        no-repeat
                    `
                })
                }
        })
        .catch((error) => {
            console.log(error);
            console.log(like);
        });
    };
    

    const handleDeleteR = (rep) => {
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

    const handleRatio = (rep) => {
        const configuration = {
            method: "PUT",
            url: "/api/commentaire/ratioed/"+commentaire.auteur,
            data: {
                auteur: currentUser,
                nbLike: rep.nbLike,
            },

        };
        axios(configuration)
            .then((response) => {
                console.log(response);
            }
            )
            .catch((error) => {
                console.log(error);
                console.log("error client");
            }
            )

        const configuration2 = {
            method: "PUT",
            url: "/api/commentaire/reponse/ratio/"+rep.auteur
        };
        axios(configuration2)
            .then((response) => {
                console.log(response);
            }
            )
            .catch((error) => {
                console.log(error);
                console.log("error client");
            }
            )
       
    } 
    
      



    
    return(
        <div className="reponse">
            <input type="text" placeholder="Votre reponse" onChange={(e) => setReponse(e.target.value)} value={reponse} name="reponse" />
                <button onClick={handleReponse}>Envoyer</button>
                {ratio === true ? <p>Le commentaire a été supprimé car il a été ratio</p> : null}
                {Array.isArray(reponses) && reponses.length > 0 ? (
                    reponses.map((rep) => (
                        <ul>
                        <li>
                            <h3>{rep.auteur}</h3>
                            <p name="text">{rep.texte}</p>
                            <p name="date">{formatDate(rep.date)}</p>
                            <p name="likes">{rep.nbLike}
                            {rep.likedBy.includes(currentUser) === false ?
                                <button name="nolike" onClick={() => handleLike(rep)}>
                                    <img src="pngwing.png" alt="like" />
                                </button>
                                :
                                <button name="like" onClick={() => handleLike(rep)}>
                                    <img src="pngwing.png" alt="like" />
                                </button>
                            }
                            </p>
                            {currentUser === rep.auteur ? <button name="delete" onClick={() => handleDeleteR(rep)}>Supprimer</button> : null}
                        </li>
                        </ul>
                    ))
                ) : (<p>Pas de réponse</p>)
                }

        </div>
    );

}

export default Reponse;

