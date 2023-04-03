import { useState } from "react";

function Auteur(props) {

    const [auteur, setAuteur] = useState(props.auteur);

    return (
        <div>
            <span>{auteur}</span>
        </div>
    );
}

export default Auteur;


