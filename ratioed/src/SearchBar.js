import { useState }from 'react' ;
import axios from 'axios' ;


function   SearchBar ( props ){

    const [query, setQuery] = useState("") ;
    const [result, setResult] = useState([]) ;

    const  getQuery  = (evt) => {setQuery(evt.target.value)} ;

    const handleSearchSubmit = ( evt ) => {
        evt.preventDefault () ;
        const configuration  = {
            method : "GET",
            url : "/api/search",
            data : {
                query:query
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




    return(
        <div>
            <input type="text" value={query} onChange={getQuery} name='query' placeholder='Search...' />
            <button onClick={handleSearchSubmit}>Search</button>
            <ul>
                {result.map((user) => (
                    <li>{user.login}</li>
                ))}
            </ul>
        </div>
    )

} 

export default SearchBar ;