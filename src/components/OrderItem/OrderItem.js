import React from 'react';

import './OrderItem.css';

const OrderItem = (props) => {

    /**
     * Extract the data from the props
     */
    const {
        product_id,
        name,
        description,
        price,
        image_url,
        in_stock,
        quantity,
        total,
    } = props.data;

    return(
        <div role="presentation" className="orderitem-container">

            <img src={`/media/images/${image_url}`} alt={name} className="orderitem-image"/>
            <div role="presentation" className="orderitem-info-container">
                <span className="orderitem-name">
                    {name}
                </span>
                <span className="orderitem-price">
                    <label>Price:</label>&nbsp;
                    £{price}
                </span>
                <span className="orderitem-quantity">
                    <label>Quantity:</label>&nbsp;
                    {quantity}
                </span>
            </div>
            <span className="orderitem-view">
                    <a 
                    href={`/products/${product_id}`} 
                    className="button">
                        View
                    </a>
                </span>
        </div>
    )

}; 

export default OrderItem;