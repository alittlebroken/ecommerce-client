// React packages
import React from 'react';
import ReactRouter from 'react-router';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

/**
 * Support mocks
 */
import * as userAuth from '../../utils/auth';

// Components to test
import Order from './Order';

describe('<Order />', () => {

    /**
     * Mock the useSelector and useDispatch hooks
     */
     const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
     const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');

     /**
      * Clear all mocks ready for another run after each test
      */
     afterEach(() => {
         jest.clearAllMocks();
     });
 
     /**
      * Clear the hook mocks before each test
      */
     beforeEach(() => {
         // Reset the mocks
         useSelectorMock.mockClear();
         useDispatchMock.mockClear();

        /**
         * Spy on any calls to getAuth
         */
        jest.spyOn(userAuth, 'getAuth').mockReturnValue({
            user: {
                _id: 1,
                cart: 1,
                email: 'mocked@mocker.com'
            },
            auth: true,
            token: 'dsflhas8957039845jhfgdalkdfgh',
        })
     });

     /**
      * Mock a order and it's details
      */
     const orderDetails = {
        order_id: 1,
        user_id: 1,
        order_date: '2022-04-06 10:44:05.877',
        order_paid_for: false,
        order_notes: 'Please knock loudly as hard of hearing and door bell does not work',
        order_shipped: '2022-04-06 13:15:00',
        order_arrived: '2022-04-07 12:30:21',
        order_total_cost: 825.94,
        items: [
            {
                product_id: 1,
                name: 'Stainless steel smoker',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper metus ut quam venenatis semper.',
                price: 29.99,
                image_url: 'stainlesssteel_smoker.jpg',
                in_stock: true,
                quantity: 2,
                total: 59.98
            }
        ],
    };

    it('renders the component into the DOM', async () => {

        /**
        * Mock the dispatch hook
        */
        const mockDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatch);
        expect(mockDispatch).not.toHaveBeenCalled();
            
        /**
        * Mock the selector hook
        */
        useSelectorMock
        .mockReturnValue(orderDetails);

        /**
         * Render the component
         */
        render(<Order />);

        /**
         * Check it appears in the DOM
         */
        expect(screen).not.toBeNull();

    });

    it('loads and displays an order', async () => {

        /**
        * Mock the dispatch hook
        */
         const mockDispatch = jest.fn();
         useDispatchMock.mockReturnValue(mockDispatch);
         expect(mockDispatch).not.toHaveBeenCalled();
             
         /**
         * Mock the selector hook
         */
         useSelectorMock
         .mockReturnValue(orderDetails);

        /**
         * Render the component
         */
         render(<Order />);

        /**
         * Check to ensure the component was in the DOM
         */
         expect(screen).not.toBeNull();

        /**
         * Check that a dispatch was made after the
         * component was rendered
         */
         expect(mockDispatch).toHaveBeenCalledTimes(1);

         /**
          * It has the expected text displayed in the DOM
          */

         /**
          * Displays the order number
          */
         expect(screen.getByText('Order # 1')).toBeInTheDocument();

        /**
         * Displays the order details
         */
        expect(screen.getByText('£825.94')).toBeInTheDocument();
        expect(screen.getByText('2022-04-06 10:44:05.877')).toBeInTheDocument();
        expect(screen.getByText('2022-04-06 13:15:00')).toBeInTheDocument();
        expect(screen.getByText('2022-04-07 12:30:21')).toBeInTheDocument();
        //expect(screen.getByText(STATUS_CHECK_HER)).toBeInTheDocument();
        expect(screen.getByText('Please knock loudly as hard of hearing and door bell does not work')).toBeInTheDocument();
        

    });

});
