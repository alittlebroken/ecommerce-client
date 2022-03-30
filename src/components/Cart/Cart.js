import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    loadCart,
    selectCartCost,
    selectCartItems
} from '../../slices/Cart/cartSlice';

import { getAuth } from '../../utils/auth';

import './Cart.css';

const Cart = () => {

    // Get the autnetication information
    const { auth, user, token } = getAuth();

    // Alias the useDispatch hook
    const dispatch = useDispatch();

    // Update the state with the cart contents for the logged in user
    useEffect(() => {
        dispatch(loadCart({
            cart_id: user.cart,
            token: token
        }));
    }, [dispatch, token, user.cart]);

    // Get the number of items in the cart
    const currentCartCost = useSelector(selectCartCost);
    const cartItems = useSelector(selectCartItems);

    return (

        <div role="presentation" className="cart-container">

            <h3>Cart for {user.email}</h3>
            <h5>Current cart total £{currentCartCost}</h5>
            
            <button className="button">Place order</button>
        </div>
    )
};

export default Cart;