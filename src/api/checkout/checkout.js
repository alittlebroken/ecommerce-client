import axios from 'axios';
export const BASE_URL = process.env.REACT_APP_API_URL;


/**
 * Performs the checkout process for the client
 */
export const placeOrder = async payload => {
    try{

        const response = await axios.post(`${BASE_URL}/checkout/${payload.cart_id}?secret_token=${payload.token}`);
        return JSON.stringify(response);

    } catch(error) {
        throw error;
    }
};