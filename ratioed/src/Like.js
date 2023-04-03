import { useState } from "react";

function Like(props) {
    const [isLiked, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    
    const handleLike = () => {
        setLike(!isLiked);
        if (isLiked) {
            setLikeCount(likeCount - 1);
        }
        else {
            setLikeCount(likeCount + 1);
        }
    };
    
    return (
        <div>
        <button onClick={handleLike}>
            {isLiked ? "Unlike" : "Like"}
        </button>
        <span>{likeCount}</span>
        </div>
    );
}

export default Like;