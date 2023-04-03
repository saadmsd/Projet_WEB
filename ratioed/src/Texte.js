import {useState} from 'react';

function Texte(props){
    /*zone d'affichage du texte*/
    const [texte, setTexte] = useState(props.texte);

    return(
        <div>
            <span>{texte}</span>
        </div>
    );
}

export default Texte;
        