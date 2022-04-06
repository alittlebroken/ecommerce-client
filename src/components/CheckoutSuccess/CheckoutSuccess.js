import React from 'react';

import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
    return (
        <div role="presentation" className="checkoutsuccess-container">
            <h3>Thank you for your order.</h3>
            <span>
            Please check the order within your profile for further updates.
            </span>
        </div>
    );
};

export default CheckoutSuccess;