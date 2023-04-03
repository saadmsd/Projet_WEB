import { useState } from "react";
import Bouton from "./Bouton";
import Auteur from "./Auteur";
import Texte from "./Texte";
import Commentaire from "./Commentaire";

function ListeCommentaire(props) {
    /*Liste des commentaires*/
    const [filtre, setFiltre] = useState("Tous");
    const [commentaires, setCommentaires] = useState(props.commentaires);
    const [commentaire, setCommentaire] = useState("");
    const [auteur, setAuteur] = useState("");
    const [date, setDate] = useState("");
    const [heure, setHeure] = useState("");
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [reponse, setReponse] = useState("");

    const handleCommentaire = (event) => {
        setCommentaire(event.target.value);
    }

    const handleAuteur = (event) => {
        setAuteur(event.target.value);
    }

    const handleDate = (event) => {
        setDate(event.target.value);
    }

    const handleHeure = (event) => {
        setHeure(event.target.value);
    }

    const handleReponse = (event) => {
        setReponse(event.target.value);
    }

    const handleLike = () => {
        setLike(like + 1);
    }

    const handleDislike = () => {   
        setDislike(dislike + 1);
    }

    const handleRepondre = () => {
        setReponse(reponse);
    }

    const handleFiltre = (event) => {
        setFiltre(event.target.value);
    }

    const handleAjouter = () => {
        setCommentaires([...commentaires, {auteur: auteur, date: date, heure: heure, texte: commentaire, like: like, dislike: dislike, reponse: reponse}]);
    }

    return (
        <div>
            <div>
                <select onChange={handleFiltre}>
                    <option value="Tous">Tous</option>
                    <option value="Like">Like</option>
                    <option value="Dislike">Dislike</option>
                </select>
            </div>
            <div>
                <input type="text" value={auteur} onChange={handleAuteur} placeholder="Auteur"/>
                <input type="text" value={date} onChange={handleDate} placeholder="Date"/>
                <input type="text" value={heure} onChange={handleHeure} placeholder="Heure"/>
                <input type="text" value={commentaire} onChange={handleCommentaire} placeholder="Commentaire"/>
                <button onClick={handleAjouter}>Ajouter</button>
            </div>
            <div>
                <Commentaire auteur={auteur} date={date} heure={heure} texte={commentaire} like={like} dislike={dislike} reponse={reponse}/>
            </div>
        </div>
    );
}

export default ListeCommentaire;
    