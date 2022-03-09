import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { performSearch, setSearchTerm } from '../../slices/Search/searchSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Search.css';

// Main component
const Search = () => {

    // alias the useDispatch method
    const dispatch = useDispatch();

    // Display the search boxes
    return (
        <form name="search" id="search" className="search-form">

            <Form.Control type="search"
            placeholder="Search"
            name="searchInput"
            id="SearchInput" 
            onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
            }}
             />

            <Button
            variant="warning"
            name="search"
            id="searchButton"
            onClick={(e) => {
                e.preventDefault();
                dispatch(performSearch());
            }}>Search</Button>

        </form>
    );

};

// Exports the component
export default Search;