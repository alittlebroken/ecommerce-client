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