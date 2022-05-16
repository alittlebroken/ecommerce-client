import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ProductsList.css';
import ProductCard from '../ProductCard/ProductCard';

import {
    selectMessage,
    selectType,
    selectCode
} from '../../slices/Messages/messagesSlice';

import { 
    performSearch,
    selectSearchResults,
    selectSearchTerms
  } from '../../slices/Search/searchSlice';

const ProductsList = () => {

    // Alias the dispatch hook
    const dispatch = useDispatch();

    // Get search terms and serarch results
    const searchTerm = useSelector(selectSearchTerms);
    const searchResults = useSelector(selectSearchResults);

    /**
     * Gather data from the slices
     */
     const message = useSelector(selectMessage);
     const messageType = useSelector(selectType);
     const messageCode = useSelector(selectCode);
     let messageStyle = '';
 
     /**
      * Check the type of message and set appropriate
      * styles ect
      */
     if(messageType === 'OK'){
         messageStyle = 'message-ok';
     } else if (messageType === 'WARNING') {
         messageStyle = 'message-warn';
     } else if (messageType === 'ERROR') {
         messageStyle = 'message-error';
     }

    // different text based on wether we have search terms to look for
    // First up when we have a search term
    const haveTerm = `Products matching ${searchTerm}`;
    // Now for when we have no term
    const haveNoTerm = `Latest products`;

    // Get a list of products each time a new search term is set
    useEffect(() => {

        // Dispatch the perform search action
        dispatch(performSearch({
            searchTerms: searchTerm
        }))

    }, [dispatch, searchTerm]);

    // Render the component
    return (
        <div className="products-precontainer">
        <div id="products-container" className="products-container" role="presentation">

            <h3>{searchTerm ? haveTerm : haveNoTerm }</h3>

            <div className="products-wrapper" id="products-wrapper" role="presentation">
                
                {searchResults.map(product => {
                    return <ProductCard key={product.product_id} data={product} />;
                })}

            </div>

            <div role="presentation" className={`messages ${messageStyle}`} >
                {message ? message : null}
            </div>

        </div>
        </div>

    );

};

export default ProductsList;