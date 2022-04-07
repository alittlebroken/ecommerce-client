import axios from 'axios';
import Checkout from '../../components/Checkout/Checkout.js';

import { placeOrder } from './checkout.js';

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

// Mock axios
jest.mock('axios');

describe('checkout', () => {

    it('should start the checkout process and return the checkout url', async () => {

        // auth Token to send with the request
        const authToken = '84507q348578fdsfjna;EFF';

        // Cart of the user to checkout
        const cartId = 1;

        // The url that we expect our method to call
        const url = `${BASE_URL}/checkout/${cartId}?secret_token=${authToken}`;
        const responseUrl = "https://stripe.com/api/checkout/38478723";

        // Mock the axios request
        axios.post.mockResolvedValueOnce({ url: responseUrl });

        // Payload to send across
        const payload = {
            token: authToken,
            cart_id: cartId
        };

        // execute the method to place the order
        const response = await placeOrder(payload);

        // Check that the reponse is as we expect
        expect(axios.post).toHaveBeenCalledWith(url, payload);
        // Check that a url was sent back
        expect(JSON.parse(response.url)).not.toBeNull();

    })

});