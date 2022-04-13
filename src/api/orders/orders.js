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