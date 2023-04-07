import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const Signup = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

         axios.post("/api/user/", {
             login,
             password,
             lastname,
             firstname,
         })
         .then((res) => {
             if (res.status === 200) {
                 console.log(res.data);
             } else {
                 const error = new Error(res.error);
                 throw error;
             }
         })
         .catch((err) => {
             console.log("en bas")
             console.error(err);
             console.log("en haut");
             setError("Error signingup please try again");
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
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} name =  "login" />
        </label>
        <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name = "password" />
        </label>
        <label>
            Lastname:
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} name = "lastname" />
        </label>
        <label>
            Firstname:
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} name = "firstname" />
        </label>
        <button type="submit">Sign up</button>
            <button type="reset" onClick={handleReset}>Reset</button>
        {error && <p>{error}</p>}
        </form>
    );
};

export default Signup;