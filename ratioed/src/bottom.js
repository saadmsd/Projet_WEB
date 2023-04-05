import { useState } from "react";
import NewComment from "./NewComment";
import Switch from "./Switch";
//import "./style/Bottom.css";

function Bottom(props) {
    const { page,setPage } = props;
    const [id, setId] = useState(0);
    
    const handleId = (evt) => {
        setId(evt.target.value);
    };
    
    return (
        <div id="div">
            <Switch page = {page} setPage={setPage} id="switch"/>
            <NewComment  id = "NC"/>
        </div>
    );
}

export default Bottom;