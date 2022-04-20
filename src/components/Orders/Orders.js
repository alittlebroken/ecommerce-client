import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadOrders, selectOrders, setFilter } from '../../slices/Orders/ordersSlice';
import { useParams } from 'react-router-dom';
import { getAuth } from '../../utils/auth';

import OrdersList from '../OrdersList/OrdersList';

import './Orders.css';

const Orders = () => {

    /**
     * Authentication data
     */
    const { user, token } = getAuth();

    /**
     * Alias the dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * Get the parameters from the react router route
     */
    const { filter } = useParams();

    /**
     * Set the filter for the cart contents
     */
    useEffect(() => {
        dispatch(setFilter(filter));
    },[dispatch, filter]);

    /**
     * Load the order data into the cart
     */
    useEffect(() => {

        /**
         * Build the payload to send
         */
        const payload = {
            user_id: user._id,
            token
        };

        /**
         * Dispatch the action
         */
        dispatch(loadOrders(payload));

    },[user._id, token, dispatch]);

    /**
     * Get the orders from the store
     */
    const orders = useSelector(selectOrders);
    
    return (
        <div role="presentation" className="orders-container">
            <OrdersList data={orders} filter={filter} />
        </div>
    )
};

export default Orders;
