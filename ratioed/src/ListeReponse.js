import React from "react";
import { useState } from "react";
import Reponse from "./Reponse";
import axios from "axios";

function ListeReponse(props) {
    
    const {currentUser, commentaire} = props;
    const [reponses, setReponses] = useState([]);
    const [req,setReq] = useState(false);

    const getReponses = () => {
            const configuration = {
                method: "GET",
                url: "/api/commentaire/reponse/"+commentaire.id,
            };
            axios(configuration)
                .then((response) => {
                    console.log(response);
                    setReponses([]);
                    setReponses(response.data.result);
                })
                .catch((error) => {
                    console.log(error);
                });    

        setReq(true);
    }

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    return (
        <div>
            <h2>Reponses</h2>
            {req===false ? getReponses() : null}
            <button onClick={getReponses}>Refresh</button>
            {reponses.toReversed().map((reponse) => (
                <ul>
                    <Reponse key={reponse.id} reponse={reponse} formatDate={formatDate} currentUser={currentUser}/>
                </ul>
            ))}
        </div>
    );
}

export default ListeReponse;