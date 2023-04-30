import React, { useState } from "react";
import axios from "axios";
import './style/Signup.css';
import Swal from 'sweetalert2';

axios.defaults.baseURL = "http://localhost:3000";

const Signup = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [passOk, setPassOk] = useState(false);
    const [error, setError] = useState("");

    
    const handleSubmit = (e) => {  
        e.preventDefault();
        if (pass1===pass2) {
            setPassOk(true);
            const configuration = {
                method: "POST",
                url: "/api/user/",
                data: {
                    login: login,
                    password: pass1,
                    lastname: lastname,
                    firstname: firstname,
                },
            };
            axios(configuration)
                .then((response) => {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'BIENVENUE ' + firstname + ' ' + lastname + ' !',
                        text: "Vous êtes bien inscrit",
                        color: 'green',
                        confirmButtonText: 'OK',
                        position: 'center',
                        backdrop: `
                            rgba(0,123,0,0.4)
                            url("verratti.gif")
                            center top
                            no-repeat
                        `
                    })
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.response.data.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'OUPS !',
                        text: error.response.data.message,
                        color: 'red',
                        confirmButtonText: 'OK',
                        position: 'center',
                        backdrop: `
                            rgba(123,0,0,0.4)
                            url("kimpembe.gif")
                            center top
                            no-repeat
                        `
                    })
                }
                );
        } else {
            setPassOk(false)
            setError("Passwords do not match");
            setPass1("");
            setPass2("");
            Swal.fire({
                icon: 'error',
                title: 'OUPS !',
                text: error,
                color: 'red',
                confirmButtonText: 'OK',
                position: 'center',
                backdrop: `
                    rgba(123,0,0,0.4)
                    url("nuno.gif")
                    center top
                    no-repeat
                `
            })
        }
    };

    const handleReset = () => {
        setLogin("");
        setPass1("");
        setPass2("");
        setLastname("");
        setFirstname("");
        setError("");
        };


    return (
        <div>
        
        <form id="signup">
        <h1>BIENVENUE SUR RATIOED LE 1ER RESEAU SOCIAL DE RATIO AU MONDE ENTIER</h1>
        <img src="logo.jpeg" alt="ratioed"></img>
        <h2>Connectez-vous ou inscrivez-vous</h2>
        <label>
            Pseudo:
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} name =  "login" />
        </label>
        <label>
            Mot de passe:
            <input type="password" value={pass1} onChange={(e) => setPass1(e.target.value)} name = "pass1" />
        </label>
        <label>
            Confirmer le mot de passe:
            <input type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} name = "pass2" />
        </label>
        <label>
            Nom:
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} name = "lastname" />
        </label>
        <label>
            Prénom:
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} name = "firstname" />
        </label>
        <button type="submit" onClick={handleSubmit}>S'inscrire</button>
            <button type="reset" onClick={handleReset}>Effacer</button>
        </form>
        </div>
    );
};

export default Signup;