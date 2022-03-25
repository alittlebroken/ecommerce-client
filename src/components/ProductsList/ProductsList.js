import React from 'react';

import './ProductsList.css';
import ProductCard from '../ProductCard/ProductCard';

const ProductsList = (props) => {

    // Extract the passed in props
    const { searchTerm, searchResults } = props;

    // different text based on wether we have search terms to look for
    // First up when we have a search term
    const haveTerm = `Products matching ${searchTerm}`;
    // Now for when we have no term
    const haveNoTerm = `Latest products`;

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

        </div>
        </div>

    );

};

export default ProductsList;