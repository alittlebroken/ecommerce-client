import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

import { findProducts } from './products.js';

// Mock axios
jest.mock('axios');

// Mock products that could be Returned from the API
const mockedProducts = [
    {
        product_id: 1,
        name: 'West devonshire bee drones',
        description: '100 drone bees from West Devonshire',
        price: 99.99,
        image_url: '',
        in_stock: true
    },
    {
        product_id: 2,
        name: 'West devonshire queen bee',
        description: 'Highest quality quuen bee from the best region in the UK for bees.',
        price: 159.99,
        image_url: '',
        in_stock: false
    },
    {
        product_id: 3,
        name: 'Pine bee hive - starter kit',
        description: 'Contains all you need to start your beekeeping adventure',
        price: 349.99,
        image_url: '',
        in_stock: true
    }
];

describe('findProducts', () => {

    it('should return some products when passed a search term', async () => {

        // set the mock axios to return the products on successful API call
        axios.post.mockResolvedValueOnce(mockedProducts);

        // generate the payload to send to the API
        const payload = {
            searchTerms: 'bee'
        };

        // execute the request to the API
        const result = await findProducts(payload);

        // Now test the data returned
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/search`, payload);
        expect(result.sort()).toEqual(mockedProducts.sort());

    });

    it('should return some products when no search term is passed', async () => {

        // set the mock axios to return the products on successful API call
        axios.post.mockResolvedValueOnce(mockedProducts);

        // generate the payload to send to the API
        const payload = {
            searchTerms: ''
        };

        // execute the request to the API
        const result = await findProducts(payload);

        // Now test the data returned
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/search`, payload);
        expect(result.sort()).toEqual(mockedProducts.sort());

    });

    it('should return an empty array if no products found', async () => {

        // set the mock axios to return the products on successful API call
        axios.post.mockResolvedValueOnce([]);

        // generate the payload to send to the API
        const payload = {
            searchTerms: 'lemons'
        };

        // execute the request to the APIw
        const result = await findProducts(payload);

        // Now test the data returned
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/search`, payload);
        expect(result.sort()).toEqual([].sort());

    });

});