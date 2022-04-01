import React from 'react';

import './CartItem.css';

const CartItem = (props) => {

    // Extract out the props
    const {
       cart_id,
       quantity,
       product_id,
       name,
       price,
       image_url,
       in_stock
    } = props.item;

    const cartLineTotal = parseFloat(price) * parseInt(quantity);

    return (
        <div role="presentation" className="cartitem-container">

            <img src={`/media/images/${image_url}`} alt={name} className="cartitem-image" />
            <h5 className="cartitem-title">{name}</h5>
            <span className="cartitem-price">£{parseFloat(cartLineTotal).toFixed(2)}</span>
            <div className="cartitem-update" role="presentation">
                <button className="button button-small cartitem-button" onClick={() => {
                    props.onHandleClick(product_id, parseInt(quantity) -1 )
                }}>-</button>
                <span>Quantity: {quantity}</span>
                <button className="button button-small cartitem-button" onClick={() => {
                    props.onHandleClick(product_id, parseInt(quantity) +1 )
                }}>+</button>
                <button className="cartitem-link" onClick={() => {
                    props.onHandleClick(product_id, 0 )
                }}>Remove</button>
            </div>

        </div>
    )

};

export default CartItem;