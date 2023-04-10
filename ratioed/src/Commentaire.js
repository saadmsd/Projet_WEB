import { useState } from "react";


function Commentaire(props){

    const {commentaire} = props;
    const [nbLike, setNbLike] = useState(commentaire.nbLike);
    const [like, setLike] = useState(false);

    const handleLike = () => {
        if (like) {
            setNbLike(nbLike-1);
            setLike(false);
        } else {
            setNbLike(nbLike+1);
            setLike(true);
        }
    };

    return (
        <div>
            <h3>{commentaire.auteur}</h3>
            <p>{commentaire.texte}</p>
            <p>{props.formatDate(props.commentaire.date)}</p>
            <p>{commentaire.nbLike}</p>
            <button onClick={handleLike}>Like</button>
        </div>
    );

    
    
}

export default Commentaire;