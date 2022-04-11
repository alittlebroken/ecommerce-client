import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

// Login a user with the API
export const loginUser = async (credentials) => {
    try{
        
        // Attempt to login to the API
        return await axios.post(`${BASE_URL}/auth/login`, credentials);
       
    } catch(error) {
        
        let errorMessage;

        if(error?.response?.data?.message){
            errorMessage = error?.response?.data?.message;
        } else {
            errorMessage = 'There was an unspecified error.'
        }

        const err = new Error(errorMessage);
        throw err;
    }
};

// Logout a user
export const logoutUser = async (credentials) => {
    try{

        // destroy the localStorage Icon
        localStorage.removeItem('token');

        return {
            status: 'OK',
            message: 'Logged out successfully.'
        }

    } catch(error) {
        throw error;
    }
};

// register a new user
export const registerUser = async (credentials) => {

    try{

        // send the registration deatials across to the API
        const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
        return response;

    } catch(error) {
        let errorMessage;

        if(error?.response?.data?.message){
            errorMessage = error?.response?.data?.message;
        } else {
            errorMessage = 'There was an unspecified error.'
        }

        const err = new Error(errorMessage);
        throw err;
    }

};

/**
 * get user details
 */
export const getUser = async (payload) => {

    try{

        /**
         * Extract the data from the payload
         */
        const { user_id, token } = payload;
        
        /**
         * Get the users details from the API
         */
        const response = await axios.get(`${BASE_URL}/users/${user_id}?secret_token=${token}`);
        
        
        return response;

    } catch(error) {
        throw error;
    }

};

/**
 * Update a users account details
 */
export const updateUser = async (payload) => {

    try{

        /** 
         * Extract the data from the arguments
         */
        const { id, token, updates } = payload;

        /**
         * Send the request and record the response from the API
         */
        const response = await axios.put(`${BASE_URL}/users/${id}?secret_token=${token}`, updates);
        
        return response;

    } catch(error) {
        throw error;
    }

};