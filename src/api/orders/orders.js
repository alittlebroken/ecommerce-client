import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Function to get all of a customers orders
 */
export const getCustomerOrders = async (payload) => {

    /**
     * Contact the API and get the data
     */
    try{

        const response = await axios.get(`${BASE_URL}/users/${payload.user_id}/orders?secret_token=${payload.token}`)
        
        return response;

    } catch(error) {
        throw error;
    }

};

/**
 * Function to get one order form the API for a user
 */
export const getCustomerOrder = async (payload) => {
    try{
        /**
         * Call the relkevant API route
         */
        const response = await axios.get(`${BASE_URL}/users/${payload.user_id}/orders/${payload.order_id}?secret_token=${payload.token}`);
        return response;
    } catch(error) {
        throw error;
    }
};

/**
 * Get the items for an order
 */
export const getOrderItems = async (payload) => {
    return null;
};