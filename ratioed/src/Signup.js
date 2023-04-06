import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:3000", {
            login,
            password,
            lastname,
            firstname,
        })
        .then((res) => {
            if (res.status === 201) {
                console.log(res.data);
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((err) => {
            console.error(err);
            setError("Error signing up please try again");
        });
    };


    const handleReset = () => {
        setLogin("");
        setPassword("");
        setLastname("");
        setFirstname("");
        setError("");
        };


    return (
        <form onSubmit={handleSubmit}>
        <label>
            Login:
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
            Lastname:
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </label>
        <label>
            Firstname:
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </label>
        <button type="submit">Sign up</button>
            <button type="reset">Reset</button>
        {error && <p>{error}</p>}
        </form>
    );
};

export default Signup;
