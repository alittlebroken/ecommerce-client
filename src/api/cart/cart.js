import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Requests the contents of a users cart from the backend API
 */
export const getCartContent = async (payload) => {

    // Extract the props
    const { cart_id, token } = payload;

    try{

        const response = await axios.get(`${BASE_URL}/carts/${cart_id}?secret_token=${token}`);
        return JSON.stringify(response);


    } catch(error) {
        throw error; 
    }

};

/**
 * Empties a cart of all items
 */
export const emptyCart = async (payload) => {

    try{

        // Extract payload
        const { cart_id, token } = payload;

        const response = await axios.delete(`${BASE_URL}/carts/${cart_id}?secret_token=${token}`);
        return JSON.stringify(response);

    } catch(error) {
        throw error;
    }

};

/**
 * Updates a cart contents
 */
export const updateCart = async (payload) => {

    try{

        // Extract the payload
        const { cart_id, product_id, quantity, token } = payload;

        // Create the data to send to the API
        const update = {
            quantity
        };

        // Send the data to the backedn and await the response
        const response = await axios.put(`${BASE_URL}/carts/${cart_id}/items/${product_id}?secret_token=${token}`, update);
        return JSON.stringify(response);

    } catch(error) {
        throw error;
    }

};

/**
 * Add an item to the users cart
 */
export const addToCart = async payload => {

    try{

        // Extract payload data
        const { cart_id, product_id, quantity, token } = payload;

        // Create the data object to send
        const data = {
            items: [
                { cartId: cart_id, productId: product_id, quantity }
            ]
        }

        // Send the request to the backend
        const response = await axios.post(`${BASE_URL}/carts/${cart_id}?secret_token=${token}`, data);
        
        return JSON.stringify(response);

    } catch(error) {
        throw error;
    }

};