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
    const [like, setLike] = useState(0);
    const [ratio, setRatio] = useState(false);


    useEffect(() => {
        getReponses();
    }, [like]);

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
                //console.log("reponse");
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
                setLike(response.data.result.nbLike);
                const comLike = commentaire.nbLike;
                const repLike = response.data.result.nbLike;
                if (repLike > comLike && response.data.result.texte === "ratio") {
                    handleDelete();
                    //handleRatio(rep);
                    setRatio(true);
                    //alert(`HAHAHAHAHAHAHAHAHAHAHA TA REUSSI A RATIO CE PTIT BOUFFON DE ${commentaire.auteur}`);
                    Swal.fire({
                        title: 'RATIO!',
                        text: `HAHAHAHAHAHAHAHAHAHAHA TA REUSSI A RATIO CE PTIT BOUFFON DE ${commentaire.auteur}`,
                        color: 'red',
                        confirmButtonText: 'EZ',
                        position: 'center',
                        backdrop: `
                            rgba(123,0,0,0.4)
                            url("kimpembe.gif")
                            center top
                            no-repeat
                        `
                    })
                }
        })
        .catch((error) => {
            console.log(error);
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
                //setReponses(response.data.result);
                getReponses();        
            })
            .catch((error) => {
                console.log(error);
                console.log("error client");
            })
    }

    const handleRatio = (rep) => {
        const configuration = {
            method: "PUT",
            url: "/api/commentaire/reponse/ratio/"+rep._id,
            data: {
                auteur: rep.auteur,
                cptRatio: rep.cptRatio + 1,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                console.log("error client");
            })

        const configuration2 = {
            method: "PUT",
            url: "/api/commentaire/ratio/"+commentaire.id,
            data: {
                auteur: commentaire.auteur,
                cptRatioed: commentaire.cptRatioed + 1,
            },
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

