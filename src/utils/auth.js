// Authentication utilities
import jwt_decode from 'jwt-decode';
const axios = require('axios');

// Create a new instance to share with various packages
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

/**
 * Extracts the user auth infor from the token
 */
 export const getAuth = () => {

    // Get the token
    const authToken = JSON.parse(localStorage.getItem('token'));

    // Check we have an token to say we are authentictaed
    if(!authToken){
        return false;
    }

    // Decode the token and extract the relevant information
    const decodedToken = jwt_decode(authToken);
    const authObject = {
        auth: true,
        token: authToken,
        user: decodedToken.user
    }
    return authObject;
    
};

export default API;