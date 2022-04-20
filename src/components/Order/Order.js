import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadOrder, selectOrders } from '../../slices/Orders/ordersSlice';
import { getAuth } from '../../utils/auth';

import { useParams } from 'react-router-dom';

import './Order.css';

import OrderItem from '../OrderItem/OrderItem';
import { convertDateTime } from '../../utils/utils';

const Order = () => {

    /**
     * Extract the relevant auth information
     */
    const { user, token } = getAuth();
    
    /**
     * get the passed in order id
     */
    const { id } = useParams();

    /**
     * Alias the dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * Get the required data from the store
     */
    const orderData = useSelector(selectOrders);

    /**
     * Extract the data
     */
    const {
        order_total_cost,
        order_date,
        order_shipped,
        order_arrived,
        order_notes,
        items,
    } = orderData;

    /**
     * Format the date and times
     */
    const order_date_formatted = convertDateTime(order_date);
    const order_shipped_formatted = convertDateTime(order_shipped);
    const order_arrived_formatted = convertDateTime(order_arrived);

    /**
     * Populate the order store
     */
    useEffect(() => {
        /**
         * Generate the payload to send to the API
         */
        const payload = {
            user_id: user._id,
            token: token,
            order_id: id,
        }

        /**
         * Dispath the load order action with the correct payload
         */
        dispatch(loadOrder(payload));

    }, [user._id, token, id, dispatch])

    /**
     * render the component
     */
    return (
        <div role="presentation" className="order-container">
            <h2>Order  # {orderData.order_id}</h2>
            <h5>Details:</h5>
                <div role="presentation" className="order-details-container">
                    <label>Total:</label>
                      <span>£{order_total_cost && order_total_cost}</span>

                    <label>Ordered:</label>
                      <span>{order_date && order_date_formatted}</span>

                    <label>Shipped:</label>
                      <span>{order_shipped && order_shipped_formatted}</span>

                    <label>Arrived:</label>
                      <span>{order_arrived && order_arrived_formatted}</span>

                    <label>Notes:</label><br />
                      <span>{order_notes && order_notes}</span>
                </div>
            <h5>Items:</h5>
                <div role="presentation" className="orderitems-container">
                    {items?.map(item => {
                        return <OrderItem key={item.product_id} data={item} />;
                     })}
                </div>
        </div>
    )

};

export default Order;