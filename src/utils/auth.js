// Authentication utilities
const axios = require('axios');

// Create a new instance to share with various packages
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default API;