import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

// Login a user with the API
export const loginUser = async (credentials) => {
    try{
        
        // Attempt to login to the API
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
        
        return response;
       
    } catch(error) {
        const err = new Error(error.response.data.message);
        throw err;
    }
};