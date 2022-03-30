import axios from 'axios';

import { 
    getCartContent,
    emptyCart,
    updateCart,
    addToCart
} from './cart.js';

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Mocks
 */
// Mock a users cart
const usersCartMock = [
    {
        email: 'userone@test.com',
        cart_id: 1,
        quantity: 2,
        name: 'Mocked product',
        description: 'Mocked product description',
        price: 1.99,
        image_url: 'mockedproduct.png',
        in_stock: true
    }
]

const usersEmptyCartMock = [];

// Mock axios
jest.mock('axios');

describe('getCartContent', () => {

    it('should return a cart and the items within it', async () => {

        // Mock the request
        axios.get.mockResolvedValueOnce(usersCartMock);

        // Mock the users token
        const token = 'dsdkawfgjdfghghaerghalgf434829rc0';

        // Payload to send with request
        const payload = { cart_id: 1, token: token }

        // Execute the request
        const response = await getCartContent(payload);

        // check the results of running this test
        expect(axios.get).toHaveBeenCalledWith(
            `${BASE_URL}/carts/${payload.cart_id}?secret_token=${payload.token}`
        );
        expect(JSON.parse(response).sort()).toEqual(usersCartMock);

    });

    it('should return an empty array if no items found',  async () => {

        // Mock the request
        axios.get.mockResolvedValueOnce(usersEmptyCartMock);

        // Mock the users token
        const token = 'dsdkawfgjdfghghaerghalgf434829rc0';

        // Payload to send
        const payload = { cart_id: 1, token: token}

        // Execute the get request
        const response = await getCartContent(payload);

        // Check the response is as we expected
        expect(axios.get).toHaveBeenCalledWith(
            `${BASE_URL}/carts/${payload.cart_id}?secret_token=${payload.token}`
        );
        expect(JSON.parse(response).sort()).toEqual(usersEmptyCartMock.sort());

    });

    it('should return an unauthorized message if no token set', async () => {

        // Generate an error for Mocking
        const mockError = new Error('Unauthorized');
        mockError.status = 401;

        // Mock the request
        axios.get.mockResolvedValueOnce(mockError);

        // Mock the users token
        const token = '';

        // Payload to send
        const payload = { cart_id: 1, token: token }

        // Execute the get request
        const response = await getCartContent(payload);

        // Check the request was made with the correct URL
        expect(axios.get).toHaveBeenCalledWith(
            `${BASE_URL}/carts/${payload.cart_id}?secret_token=${payload.token}`
        );

        // Check response code is as expected
        expect(axios.get).toBeCalledWith(`${BASE_URL}/carts/${payload.cart_id}?secret_token=${payload.token}`);
        expect(JSON.parse(response).status).toEqual(401);

    });

});

describe('emptyCart', () => {

    it('should remove all items from the cart', async () => {

        // Mock the axios delete request
        axios.delete.mockResolvedValueOnce([]);

        // Mock the users token
        const token = 'dsdkawfgjdfghghaerghalgf434829rc0';

        // Generate the payload for the method
        const payload = { cart_id: 1, token: token };

        // Execute the delete request
        const response = await emptyCart(payload);

        // Check the repsonse is the way we expect it to be
        expect(axios.delete).toBeCalledWith(`${BASE_URL}/carts/${payload.cart_id}?secret_token=${payload.token}`);
        expect(JSON.parse(response)).toEqual([]);

    });

});

describe('updateCart', () => {

    it('should update an entry in the cart', async () => {

        // Create the user token
        const token = 'sldkasdkadkafja;rjefjfjfj;dfisdi';

        // Payload for the updated item
        const payload = {
            cart_id: 1,
            product_id: 1,
            quantity: 2,
            token
        }

        const mockedResponse = [{
            cartd_id: 1,
            product_id: 1,
            quantity: 2
        }];

        const payloadSent = { quantity: 2 };

        // Mock the axios response
        axios.put.mockResolvedValueOnce(mockedResponse);

        // execute the function to the backend
        const response = await updateCart(payload);

        // Check the response to ensure it has behaved as we expected
        expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/carts/${payload.cart_id}/items/${payload.product_id}?secret_token=${payload.token}`, payloadSent);
        expect(JSON.parse(response).sort()).toEqual(mockedResponse.sort());

    });

    it('should remove an item from the cart if quantity set to zero', async () => {

        // Create the user token
        const token = 'sldkasdkadkafja;rjefjfjfj;dfisdi';

        // Payload for the updated item
        const payload = {
            cart_id: 1,
            product_id: 1,
            quantity: 0,
            token
        }

        const mockedResponse = [];

        const payloadSent = { quantity: 0 };

        // Mock the axios response
        axios.put.mockResolvedValueOnce(mockedResponse);

        // execute the function to the backend
        const response = await updateCart(payload);

        // Check the response to ensure it has behaved as we expected
        expect(axios.put).toHaveBeenCalledWith(`${BASE_URL}/carts/${payload.cart_id}/items/${payload.product_id}?secret_token=${payload.token}`, payloadSent);
        expect(JSON.parse(response).sort()).toEqual(mockedResponse.sort());


    });

})

describe('addToCart', () => {

    it('should add an item to the cart', async () => {

        // Auth token
        const token = 'erfgakjdfksldfksdjfhsldjfsudfhsdfhsdd';

        // Payload for the method
        const payload = {
            cart_id: 1,
            user_id: 1,
            product_id: 2,
            quantity: 1,
            token
        };

        // Payload that was sent via axios
        const payloadSent = {
            items: [
                {
                    cartId: payload.cart_id,
                    productId: payload.product_id,
                    quantity: payload.quantity
                }
            ]
        };

        // Mock the API response
        const mockResponse = {
            cart_id: 1,
            product_id: 1,
            quantity: 1
        };

        // Set the mocked response axios should return
        axios.post.mockResolvedValueOnce(mockResponse);

        // Execute the API request
        const response = await addToCart(payload);

        // Check the response is what we espect
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/carts/${payload.cart_id}?secret_token=${payload.token}`,payloadSent);
        expect(JSON.parse(response)).toEqual(mockResponse);

    });

})