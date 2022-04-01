import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Product.css';

import { getProduct } from '../../slices/Search/searchSlice';

import { 
    selectSearchResults
  } from '../../slices/Search/searchSlice';

import { getAuth } from '../../utils/auth';
import { addItemToCart } from '../../slices/Cart/cartSlice';

const Product = () => {

    // extract auth data
    const { user, token } = getAuth();

    // Get the product ID from the URL
    const { product_id } = useParams();

    // Alias the useDispatch function
    const dispatch = useDispatch();

    // Load the data
    useEffect(() => {

        // Contact the API
        dispatch(getProduct(product_id));

    },[dispatch, product_id]);

    // Get search terms and search results
    const searchResults = useSelector(selectSearchResults);

    // Handle Add to cart click
    const handleAddToCartClick = (e, prodid) => {

        const payload = {
            cart_id: user.cart,
            product_id: prodid,
            token,
            quantity: 1
        }
        
        dispatch(addItemToCart(payload));

    };

    return (
        <div className="product-container" role="presentation">
             
            <h2 className="product-heading">{searchResults[0]?.name}</h2>

            <img 
            src={`/media/images/${searchResults[0]?.image_url}`} 
            className="product-image" 
            alt={searchResults[0]?.name} />

            <span className="product-price">£{searchResults[0]?.price}</span>

            <span className="product-description">
                {searchResults[0]?.description}
            </span>

            <div className="product-button-group" role="presentation">
                <button 
                className="button product-button"
                onClick={(e) => {
                    handleAddToCartClick(e, product_id);
                }} 
                >Add</button>
            </div>

        </div>
    );

};

export default Product;