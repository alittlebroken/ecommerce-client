import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ProductCard.css';
import { addToCart } from '../../slices/Cart/cartSlice.js';

const ProductCard = (props) => {

    // Extract information from the props
    const product_id = props.data.product_id;
    const name = props.data.name;
    const description = props.data.description;
    const price = props.data.price;
    const image_url = `/media/images/${props.data.image_url}`;
    const in_stock = props.data.in_stock;
    
    // Alias the dispatcher hook
    const dispatch = useDispatch();

    // Handle the click on the addToCartButton
    const handleAddToCartClick = (e) => {
        // Stop any inherent default behaviour
        e.preventDefault();

        dispatch(addToCart(product_id));

    }; 

    return (

        <div className="productCard-container">
            <a href={`/products/${product_id}`}>
                <img alt={name} src={image_url} className='productCard-image' />
            </a>
            <label className="productCard-title">{name}</label>
            <span>£{price}</span>
            <button 
            className='productCard-button button'
            onClick={(e) => {
                handleAddToCartClick(e, product_id); 
            }}>Add</button>
        </div>
    )

};

export default ProductCard;