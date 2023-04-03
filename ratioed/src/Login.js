import { useState } from 'react';

function Login (props) {
    const {login} = props;
    const [loggin, setLoggin] = useState("");
    const [password, setPassword] = useState("");

    const getLoggin = (evt) => {setLoggin(evt.target.value)}
    const getPassword = (evt) => {setPassword(evt.target.value)}

    const getConnected = () => {
        login();
    }


    const submissionHandler = (evt) => {
        evt.preventDefault();
        //getConnected();
    }

    return (
        <form method="POST" action="">
            <label htmlFor="loggin">Login</label><input id="login" onChange={getLoggin}/>
            <label htmlFor="mdp">Mot de passe</label><input type="password" id="mdp" onChange={getPassword}/>
            <button type="submit" onClick={getConnected}>Log In</button>
        </form>
    );
}

export default Login;
