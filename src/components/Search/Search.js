import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  
    setSearchTerm,
    selectSearchTerms } from '../../slices/Search/searchSlice';
import Form from 'react-bootstrap/Form';

import './Search.css';

// Main component
const Search = () => {

    // alias the useDispatch method
    const dispatch = useDispatch();
    let terms = useSelector(selectSearchTerms);
   
    // Handle the button click
    const handleButtonClick = (e) => {

        e.preventDefault();

        // Save search term to localStorage
        localStorage.setItem('searchTerms', terms);

        // redirect to show the products found
        window.location.href = '/products';

    };

    // Handle change of the input
    const handleInputChange = (e) =>  {
        e.preventDefault();
        dispatch(setSearchTerm(e.target.value));
    };

    // Display the search boxes
    return (
        <Form name="search" id="search" className="search-form">

            <Form.Control type="search"
            className="search-field"
            placeholder="Search"
            name="searchInput"
            id="SearchInput"
            value={terms ? terms : ''}
            onChange={handleInputChange}
            />

            
            <button className="button search-button"
            name="search"
            id="searchButton"
            onClick={handleButtonClick}>
                Search
            </button>
            

        </Form>
    );

};

// Exports the component
export default Search;