import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
function Login (props) {
    const {login, currentUser, setCurrentUser} = props;
    const [loggin, setLoggin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
                setCurrentUser(loggin);                
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
                        url("paredes.gif")
                        center top
                        no-repeat
                    `
                })
                }
            );
    };


    return (
        <form className='login'>
            <label htmlFor="loggin">Login</label><input id="login" onChange={getLoggin} name = "login" />
            <label htmlFor="mdp">Mot de passe</label><input type="password" id="mdp" onChange={getPassword} name = "password" />
            <button type="submit" onClick={handleSubmit}>Log In</button>
        </form>
    );
}

export default Login;
