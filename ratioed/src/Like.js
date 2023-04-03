import { useState } from "react";

function Like(props) {
    //const { page, setPage } = props;
    const [likes, setLike] = useState(0);
    const [isLiked, setLiked] = useState(false);

    const handleLike = (evt) => {
        if(isLiked === false){
            setLike(likes + 1);
            setLiked(true);
        }else{
            setLike(likes - 1);
            setLiked(false);
        }
    };

    return (
        <div id="div">
            <button onClick={handleLike} id="like">
                <img src="https://img.icons8.com/ios/50/000000/like--v1.png" alt="like" />
            </button>
            <p id="likes">{likes}</p>
        </div>
    );
}

export default Like;