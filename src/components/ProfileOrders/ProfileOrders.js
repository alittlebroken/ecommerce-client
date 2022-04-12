import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
    selectIsLoading,
    selectHasError,
    selectOrders,
    selectCompletedOrders,
    selectTotalOrders,
    selectPendingOrders
} from '../../slices/Orders/ordersSlice';
import './ProfileOrders.css';

const ProfileOrders = () => {

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