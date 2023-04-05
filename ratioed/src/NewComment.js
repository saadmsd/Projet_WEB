import { useState } from "react";
import ListeCommentaire from "./ListeCommentaire";


function NewComment(props) {

    const {addComment} = props;
    const [comment, setComment] = useState("");

    const getComment = (evt) => {
        setComment(evt.target.value);
    };


    const handleComment = (evt) => {
        getComment(evt);
    };

    const handleAddComment = (evt) => {
        evt.preventDefault();
        addComment(comment);
        setComment("");
    };

    return (
        <div>
            <textarea type="text" value={comment} onChange={handleComment} />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
}

export default NewComment;