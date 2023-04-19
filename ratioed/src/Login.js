import { useState } from 'react';
import axios from 'axios';

function Login (props) {
    const {login, currentUser, setCurrentUser} = props;
    const [loggin, setLoggin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [commentaires, setCommentaires] = useState([]);

    const getLoggin = (evt) => {setLoggin(evt.target.value)}
    const getPassword = (evt) => {setPassword(evt.target.value)}

    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "POST",
            url: "/api/login",
            data: {
                login: loggin,
                password: password,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                login();
                getCommentaires();
                setCurrentUser(loggin);                
            })
            .catch((error) => {
                console.log(error);
                setError(error.response.data.message);
                }
            );
    };

    const getCommentaires = () => {
        const configuration = {
            method: "GET",
            url: "/api/commentaire/",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setCommentaires(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form>
            <label htmlFor="loggin">Login</label><input id="login" onChange={getLoggin} name = "login" />
            <label htmlFor="mdp">Mot de passe</label><input type="password" id="mdp" onChange={getPassword} name = "password" />
            <button type="submit" onClick={handleSubmit}>Log In</button>
            <p>{error}</p>
        </form>
    );
}

export default Login;
