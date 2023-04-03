import { useState } from "react";
import NewComment from "./NewComment";
import Switch from "./Switch";

function Bottom(props) {
    const { page,setPage } = props;
    const [comment, setComment] = useState("");
    const [id, setId] = useState(0);
    
    const handleComment = (evt) => {
        setComment(evt.target.value);
    };
    
    const handleId = (evt) => {
        setId(evt.target.value);
    };
    
    const addComment = (comment) => {
        const newComment = {
            id: page.comments.length + 1,
            comment: comment,
        };
        page.comments.push(newComment);
    };
    const handleAddComment = (evt) => {
        evt.preventDefault();
        addComment(comment);
        setComment("");
    };
    
    return (
        <div>
        <Switch page = {page} setPage={setPage}/>
        <NewComment
            comment={comment}
            handleComment={handleComment}
            handleAddComment={handleAddComment}
        />
        </div>
    );
}

export default Bottom;