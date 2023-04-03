import {useState} from 'react';
import Like from './Like';
import Repondre from './Repondre';

function Bouton(props){

    return(
        <div>
            <Like/>
            <Repondre/>
        </div>
    );
}

export default Bouton;