import { useState } from "react";
import Auteur from "./Auteur";
import Texte from "./Texte";
import Bouton from "./Bouton";

function NewComment(props) {
    const { comment, handleComment, handleAddComment } = props;
    return (
        <div>
            <textarea type="text" value={comment} onChange={handleComment} />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
}

export default NewComment;