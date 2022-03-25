import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

// perform a search for products
export const findProducts = async (payload) => {

    try{

        // get products from the API
        const response = await axios.post(`${BASE_URL}/search`, payload);
        return JSON.stringify(response);

    } catch(error) {
        
        throw error;
    }

};