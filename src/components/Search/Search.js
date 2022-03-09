import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  
    setSearchTerm,
    selectSearchTerms } from '../../slices/Search/searchSlice';
import Button from 'react-bootstrap/Button';
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

    // Display the search boxes
    return (
        <Form name="search" id="search" className="search-form">

            <Form.Control type="search"
            placeholder="Search"
            name="searchInput"
            id="SearchInput"
            value={terms ? terms : ''}
            onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
            }}
            />

            
            <Button
            variant="warning"
            name="search"
            id="searchButton"
            onClick={handleButtonClick}>
                Search
            </Button>
            

        </Form>
    );

};

// Exports the component
export default Search;