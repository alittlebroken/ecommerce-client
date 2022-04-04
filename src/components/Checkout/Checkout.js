import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    loadCart,
    selectCartCost,
    selectCartItems,
    selectHasUpdated,
    updateMyCart
} from '../../slices/Cart/cartSlice';

import {
    processOrder,
    selectPaymentUrl
} from '../../slices/checkout/checkoutSlice';

import CartItem from '../CartItem/CartItem';
import { getAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

import './Checkout.css';

const Checkout = () => {

    // Alias the dispacth hook
    const dispatch = useDispatch();

    // Get the authentication information
    const { auth, user, token } = getAuth();

    // Alias the useNavigate hook
    const navigate = useNavigate();

    // Get the list of cart items
    const cartItems = useSelector(selectCartItems);
    const cartCost = useSelector(selectCartCost);
    const cartUpdate = useSelector(selectHasUpdated);

    /**
     * Get the paymentURL we need to navigate to
     */
    const paymentUrl = useSelector(selectPaymentUrl);
    console.log(`PaymentURL: ${paymentUrl}`)

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

    // Handle placing an order
    const handlePlaceOrder = async () => {

        const payload = {
            cart_id: user.cart,
            token: token
        }

        dispatch(processOrder(payload));

    };

    // Update the state with the cart contents for the logged in user
    useEffect(() => {
        dispatch(loadCart({
            cart_id: user.cart,
            token: token
        }));
    }, [dispatch, token, user.cart, cartUpdate]);

    /**
     * redirect on successful payment
     */
    if(paymentUrl){
        window.location.href = paymentUrl;
        return null;
    }

    return (
        <div role="presentation" className="checkout-container">

            <div role="presenation" className="checkout-items">
                <h5>Order Items:</h5>
                {cartItems.map(item => {
                    return <CartItem 
                    key={item.product_id}
                    item={item}
                    onHandleClick={updateQuantity} />
                })
                }
            </div>

            <div role="presentation" className="checkout-orderdetails">
                <button 
                className="button"
                onClick={handlePlaceOrder}
                >Place Order</button>
                <span>
                    <label>Order Total:</label> £{cartCost}</span>
                <span>
                    Please note that after clicking place order you 
                    will no longer be able to edit your cart contents
                    unless you cancel the order.
                </span>
            </div>

        </div>
    )

};

export default Checkout;