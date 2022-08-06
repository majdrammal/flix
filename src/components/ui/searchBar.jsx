import React, { useState } from 'react';
import InputChildren from 'react-input-children/lib';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {

    let navigate = useNavigate()
    const [search, setSearch] = useState()

    function searchTitle() {
        navigate(`/${search}`)
    }
    
    return (
        <InputChildren 
        type="text" 
        className="search__input" 
        placeholder="Search by Title..." 
        onChange={(event) => setSearch(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && searchTitle()}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="search__icon" onClick={searchTitle} />
        </InputChildren>
    );
}

export default SearchBar;
