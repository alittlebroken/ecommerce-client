import React from 'react';

import './CheckoutCancel.css';

const CheckoutCancel = () => {

    return (
        <div className="checkoutcancel-container" role="presentation">
            <h2>Checkout Cancelled</h2>
            <span>
                Have you forgotten something? 
            </span>
            <span>
                We will keep your cart contents safe, ready for when you wish to 
                checkout again.
            </span>
        </div>
    )

};

export default CheckoutCancel;