import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    loadCart,
    selectCartCost,
    selectCartItems,
    selectHasUpdated,
    updateMyCart
} from '../../slices/Cart/cartSlice';

import { getAuth } from '../../utils/auth';

import CartItem from '../CartItem/CartItem';

import './Cart.css';

const Cart = () => {

    // Get the authentication information
    const { auth, user, token } = getAuth();

    // Alias the useDispatch hook
    const dispatch = useDispatch();

    // Get the number of items in the cart
    const currentCartCost = useSelector(selectCartCost);
    const cartItems = useSelector(selectCartItems);
    const cartUpdate = useSelector(selectHasUpdated);

     // Handle the decrease count click
     const updateQuantity = (product_id, amount) => {
       
        let itemQuantity = amount;

        if(itemQuantity < 0){
            itemQuantity = 0;
        }

        const payload = {
            token,
            cart_id: user.cart, 
            product_id: product_id, 
            quantity: itemQuantity
        };

        dispatch(updateMyCart(payload));
    };

    // Update the state with the cart contents for the logged in user
    useEffect(() => {
        dispatch(loadCart({
            cart_id: user.cart,
            token: token
        }));
    }, [dispatch, token, user.cart, cartUpdate]);

    return (

        <div role="presentation" className="cart-container">

            <h3>Cart for {user.email}</h3>
            <h5>Current cart total £{parseFloat(currentCartCost).toFixed(2)}</h5>
            
            {cartItems.map(cartItem => {
                return <CartItem 
                key={cartItem.product_id} 
                item={cartItem} 
                onHandleClick={updateQuantity}/>
            })}

            <button className="button">Place order</button>
        </div>
    )
};

export default Cart;