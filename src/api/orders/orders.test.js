import axios from 'axios';

import { 
    BASE_URL, 
    getCustomerOrders,
    getCustomerOrder,
    getOrderItems
} from './orders';

jest.mock("axios");

describe('getCustomerOrders', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when API call is successful', () => {

        it('should return a list of customers orders', async () => {

            /**
             * Mock a list of orders for a customer
             */
            const customerOrders = [
                {
                    order_id: 1,
                    user_id: 1,
                    order_date: '2022-04-06 10:44:05.877',
                    order_paid_for: false,
                    order_notes: null,
                    order_shipped: null,
                    order_arrived: null,
                    order_total_cost: 825.94
                },
                {
                    order_id: 2,
                    user_id: 1,
                    order_date: '2022-04-07 19:15:57.03',
                    order_paid_for: true,
                    order_notes: null,
                    order_shipped: '2022-04-07 21:00:00.00',
                    order_arrived: '2022-04-08 09:34:56.874',
                    order_total_cost: 12.99
                },
                {
                    order_id: 3,
                    user_id: 1,
                    order_date: '2022-04-11 13:48:32.407',
                    order_paid_for: true,
                    order_notes: null,
                    order_shipped: '2022-04-11 16:14:34.03',
                    order_arrived: null,
                    order_total_cost: 24.99
                }
            ];
            axios.get.mockReturnValueOnce(customerOrders);

            /**
             * Token to send with the request
             */
            const authToken = '485723457385738475';

            /**
             * Create the payload to send
             */
            const payload = {
                user_id: 1,
                token: authToken,
            };

            /**
             * Make the call to the API route
             */
            const response = await getCustomerOrders(payload);

            /**
             * Check that the method behaved as expected
             */
             expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users/${1}/orders?secret_token=${authToken}`);
             expect(response).toEqual(customerOrders);

        });

    });

    describe('when API call is not successful', () => {

        it('returns an error message', async () => {

            const errorMessage = new Error('No records were found with the specified parameters');
            axios.get.mockRejectedValueOnce(errorMessage);

            /**
             * Token to send with the request
             */
             const authToken = '485723457385738475';

             /**
              * Create the payload to send
              */
             const payload = {
                 user_id: 1,
                 token: authToken,
             };

            try {

                // Send the request
                await getCustomerOrders(payload);

            } catch (error) {
                expect(error).toEqual(errorMessage);
            }

        });


    });

});

describe('getCustomerOrder', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when API call is successful', () => {

        it('should return a list of customers orders', async () => {

            /**
             * Mock a list of orders for a customer
             */
            const customerOrder = [
                {
                    order_id: 1,
                    user_id: 1,
                    order_date: '2022-04-06 10:44:05.877',
                    order_paid_for: false,
                    order_notes: null,
                    order_shipped: null,
                    order_arrived: null,
                    order_total_cost: 825.94
                },
            ];
            axios.get.mockReturnValueOnce(customerOrder);

            /**
             * Token to send with the request
             */
            const authToken = '485723457385738475';

            /**
             * Create the payload to send
             */
            const payload = {
                user_id: 1,
                order_id: 1,
                token: authToken,
            };

            /**
             * Make the call to the API route
             */
            const response = await getCustomerOrder(payload);

            /**
             * Check that the method behaved as expected
             */
             expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users/${payload.user_id}/orders/${payload.order_id}?secret_token=${authToken}`);
             expect(response).toEqual(customerOrder);

        });

    });

    describe('when API call is not successful', () => {

        it('returns an error message', async () => {

            const errorMessage = new Error('No records were found with the specified parameters');
            axios.get.mockRejectedValueOnce(errorMessage);

            /**
             * Token to send with the request
             */
             const authToken = '485723457385738475';

             /**
              * Create the payload to send
              */
             const payload = {
                 user_id: 1,
                 order_id: 1,
                 token: authToken,
             };

            try {

                // Send the request
                await getCustomerOrder(payload);

            } catch (error) {
                expect(error).toEqual(errorMessage);
            }

        });


    });

});

describe('getOrderItems', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when API call is successful', () => {

        it('should return a list of an orders items', async () => {

            /**
             * Mock a list of orders for a customer
             */
            const orderItems = [
                
            ];
            axios.get.mockReturnValueOnce(orderItems);

            /**
             * Token to send with the request
             */
            const authToken = '485723457385738475';

            /**
             * Create the payload to send
             */
            const payload = {
                user_id: 1,
                order_id: 1,
                token: authToken,
            };

            /**
             * Make the call to the API route
             */
            const response = await getCustomerOrder(payload);

            /**
             * Check that the method behaved as expected
             */
             expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users/${payload.user_id}/orders/${payload.order_id}?secret_token=${authToken}`);
             expect(response).toEqual(customerOrder);

        });

    });

    describe('when API call is not successful', () => {

        it('returns an error message', async () => {

            const errorMessage = new Error('No records were found with the specified parameters');
            axios.get.mockRejectedValueOnce(errorMessage);

            /**
             * Token to send with the request
             */
             const authToken = '485723457385738475';

             /**
              * Create the payload to send
              */
             const payload = {
                 user_id: 1,
                 order_id: 1,
                 token: authToken,
             };

            try {

                // Send the request
                await getCustomerOrder(payload);

            } catch (error) {
                expect(error).toEqual(errorMessage);
            }

        });


    });

});