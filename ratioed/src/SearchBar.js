import { useState }from 'react' ;

function   SearchBar ( props ){

    const [query, setQuery] = useState("") ;

    const  getQuery  = ( evt ) => { setQuery ( evt . target . value ) } ;

    const handleSearchTermChange = ( evt ) => {
        evt.preventDefault () ;
        props.onSearchTermChange(query) ;
    }

    const handleSearchSubmit = (evt) => {
        evt.preventDefault();
        props.onSearchSubmit(query) ;
    }


    return(
        <div>
            <input type="text" value={query} onChange={getQuery} />
            <button onClick={handleSearchSubmit}>Search</button>
        </div>
    )

} 

export default SearchBar ;