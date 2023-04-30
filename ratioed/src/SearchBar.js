import { useState, useEffect } from 'react';
import axios from 'axios';
import './style/SearchBar.css';

function SearchBar(props) {
    const { currentUser, getProfile, handleProfile, selectedUser, setSelectedUser } = props;
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (query !== '') {
            const configuration = {
                method: 'GET',
                url: '/api/search',
                params: {
                login: query,
                },
            };
            axios(configuration)
                .then((response) => {
                    console.log(response);
                    setResult([]);
                    setResult(response.data.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } 
        else {
            setResult([]);
        }
    }, [query]);

    const handleSearch = (evt) => {
        setQuery(evt.target.value);
    };

    const handleProfileClick = (user) => {
        setSelectedUser(user);
        getProfile();
    };

    return (
        <div className='searchBar'>
            <input type="text" value={query} onInput={handleSearch} name="query" placeholder="Recherche utilisateur..." />
            {query !== '' ? (
                <div className="response-container">
                {result.length === 0 ? (
                    <p>Pas de résultat</p>
                ) : (
                    <ul>
                    {result.map((user) => (
                        <li key={user._id} className="click" onClick={() => handleProfileClick(user.login)}>
                        {user.login}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            ) : null}
        </div>
    );
}

export default SearchBar;
