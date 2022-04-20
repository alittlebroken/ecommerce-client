import React from 'react';
import './OrdersList.css';
import OrderCard from '../OrderCard/OrderCard';

const OrdersList = (props) => {

    /**
     * Extract the props
     */
    const { data, filter } = props;

    return (
        <>
            <div role="presentation" className="orderslist-container">
                <h3>{filter} orders</h3>
                {data.map(order => {
                    return <OrderCard key={order.order_id} data={order} />;
                })}

            </div>
        </>
    );

};

export default OrdersList;