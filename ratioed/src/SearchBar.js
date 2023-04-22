import { useState }from 'react' ;
import axios from 'axios' ;


function   SearchBar ( props ){

    const {currentUser, getProfile, handleProfile, selectedUser, setSelectedUser} = props;

    const [query, setQuery] = useState("") ;
    const [result, setResult] = useState([]) ;

    const  getQuery  = (evt) => {setQuery(evt.target.value)} ;

    const handleSearchSubmit = ( evt ) => {
        evt.preventDefault () ;
        const configuration  = {
            method : "GET",
            url : "/api/search",
            params : {
                login: query,
            }
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


    const handleProfileClick = (user) => {
        setSelectedUser(user);
        getProfile();
    }


    return(
        <div>
            <input type="text" value={query} onChange={getQuery} name='query' placeholder='Search...' />
            <button onClick={handleSearchSubmit}>Search</button>
            {result.length === 0 ? <p>No result</p> : 
            <ul>
                {result.map((user) => (
                    <li key={user._id} className="click" onClick={() => handleProfileClick(user.login)}>{user.login}</li>
                ))}
            </ul>
            }
        </div>
    );

} 

export default SearchBar ;