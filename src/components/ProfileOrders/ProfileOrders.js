import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    selectCompletedOrders,
    selectTotalOrders,
    selectPendingOrders,
    loadOrders
} from '../../slices/Orders/ordersSlice';

import { getAuth } from '../../utils/auth';

import './ProfileOrders.css';

const ProfileOrders = () => {

    /**
     * Authentication data
     */
    const { user, token } = getAuth();

    /**
     * alias the dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * Get any data needed from the store via the selectors
     */
    const totalOrders = useSelector(selectTotalOrders);
    const pendingOrders = useSelector(selectPendingOrders);
    const completedOrders = useSelector(selectCompletedOrders);

    /**
     * Load the data
     */
    useEffect(() => {
        /**
         * Create the payload for loading the order data
         */
        const payload = {
            user_id: user._id,
            token: token,
        }

        dispatch(loadOrders(payload));
    },[user._id,token]);

    return (
        <div role="presentation" className="profileorders-container">

            <h3 className="profileorders-title">Order Summary:</h3>

            <div role="presentation" className="profileorders-total  profileorders-infobox">
                <span 
                className="profileorders-total-title">
                    Total:
                </span>
                <span 
                className="profileorders-total-data">
                    {totalOrders}
                </span>
            </div>

            <div role="presentation" className="profileorders-pending profileorders-infobox">
                <span 
                className="profileorders-pending-title">
                    Pending:
                </span>
                <span 
                className="profileorders-pending-data">
                    {pendingOrders}
                </span>
            </div>

            <div role="presentation" className="profileorders-completed profileorders-infobox">
                <span 
                className="profileorders-completed-title">
                    Completed:
                </span>
                <span 
                className="profileorders-completed-data">
                    {completedOrders}
                </span>
            </div>

        </div>
    );

};

export default ProfileOrders;