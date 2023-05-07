import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./style/Reponse.css";
import "./style/Commentaire.css";
import Swal from 'sweetalert2'
function Reponse(props){
    
    const {currentUser, commentaire, reponses, setReponses ,getReponses, deleteCommentaire, handleProfileClick} = props;
    const [reponse, setReponse] = useState("");
    //const [reponses, setReponses] = useState([]);
    const [like, setLike] = useState(-1);
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
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
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
                if (repLike > comLike && new RegExp("ratio", "i").test(rep.texte)) {
                    deleteCommentaire();
                    setRatio(true);
                    handleRatio(rep);
                    Swal.fire({
                        title: 'RATIO!',
                        text: `Félicitation vous avez réussi à ratio l'utilisateur ${commentaire.auteur}`,
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
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer votre réponse ?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Supprimé !',
                'La réponse a bien été supprimé.',
                'success'
                )
                deleteReponse(rep);
            }
            })
    }
    const deleteReponse = (rep) => {
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
                <ul>
                    {Array.isArray(reponses) && reponses.length > 0 ? (
                        reponses.map((rep) => (
                            <li key={rep._id}>
                                <h3 onClick={handleProfileClick}>
                                    <img className="avatarR" src={"https://robohash.org/"+rep.auteur+".png?bgset=bg1"} alt="avatar" />
                                    <span>{rep.auteur}</span>
                                </h3>
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
                        ))
                    ) : (<p>Pas de réponse</p>)
                    }
                </ul>
        </div>
    );

}

export default Reponse;

