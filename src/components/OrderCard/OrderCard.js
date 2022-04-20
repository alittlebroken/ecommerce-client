import React from 'react';

import { convertDateTime } from '../../utils/utils';
import './OrderCard.css';

const OrderCard = (props) => {

    /**
     * Extract out the passed in props
     */
    const { data } = props;

    /**
     * Extract out the order details
     */
    const {
        order_id,
        user_id,
        order_date,
        order_paid_for,
        order_notes,
        order_shipped,
        order_arrived,
        order_total_cost
    } = data;

    /**
     * Format the date and times
     */
    const orderDate = convertDateTime(order_date);

    /**
     * Generate the unique url for this order
     */
    const orderDetailsUrl = `/order/${order_id}`;

    return (
        <div role="presentation" className="ordercard-container">
          <span className="ordercard-ordernum">
              <label className="ordercard-label">
                  Order # &nbsp;
             </label> 
             {order_id}
          </span>
          <span className="ordercard-orderdate">
            <label className="ordercard-label">
              Ordered: &nbsp;
            </label>
            {orderDate}
          </span>
          <span className="ordercard-tracking">
          <label className="ordercard-label">

          </label>
          </span>
          <span className="ordercard-quantity">
              
          </span>
          <span className="ordercard-total">
            <label className="ordercard-label">
                Total: &nbsp;
            </label> 
            £{order_total_cost}
          </span>

          <a href={orderDetailsUrl}>
            <button className="ordercard-details button">
              Details
            </button>
          </a>

        </div>
    )

};

export default OrderCard;