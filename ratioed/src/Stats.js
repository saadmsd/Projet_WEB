import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Stats(props){

    const [ratioed, setRatioed] = useState([]);
    const [ratio, setRatio] = useState([]);

    useEffect(() => {
        getRatioed();
        getRatio();
    }, []);


    const getRatioed = () => {
        const configuration = {
            method: "GET",
            url: "/api/user/stats/ratioed",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setRatioed(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getRatio = () => {
        const configuration = {
            method: "GET",
            url: "/api/user/stats/ratio",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setRatio(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <div>
            <h2>Zone de statistique</h2>
            <h3>Classement des Looser (Ratioed)</h3>
            <ul>
                {ratioed.map((ratioed) => (
                    <li key={ratioed._id}>
                        <p>{ratioed.login}</p>
                        <p>{ratioed.cptRatioed}</p>
                    </li>
                ))}
            </ul>
            <h3>Classement des Boss (Ratio)</h3>
            <ul>
                {ratio.map((ratio) => (
                    <li key={ratio._id}>
                        <p>{ratio.login}</p>
                        <p>{ratio.cptRatio}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Stats;

            


