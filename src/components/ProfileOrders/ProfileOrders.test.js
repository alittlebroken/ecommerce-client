// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import ProfileOrders from './ProfileOrders';

describe('<ProfileOrders />', () => {

    /**
     * Mock the user auth object
     */
    const user = {
        _id: 1
    }

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
    });

    /**
     * Mock the useSelector and useDispatch hooks
     */
     const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
     const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');

    it('should have the component in the DOM', async () => {

        /**
         * Render the component
         */
        render(<ProfileOrders />);

        /**
         * Check that the compopnent does exist within the DOM
         */
        expect(screen).not.toBeNull();

    });

    it('displays the order summaries on the profile page', async () => {

        /**
         * Selector mock results
         */
        const mockSelectPendingOrders = 2;
        const mockSelectCompleteOrders = 1;
        const mockSelectTotalOrders = 3;

        /**
         * Mock the results from the selectors
         */
         useSelectorMock
          .mockReturnValueOnce(mockSelectTotalOrders)
          .mockReturnValueOnce(mockSelectPendingOrders)
          .mockReturnValueOnce(mockSelectCompleteOrders)

        /**
         * Render the component
         */
        render(<ProfileOrders />); 
        
        /**
         * Check that the component behaves as expected
         */
        expect(screen.getByText(3)).toBeInTheDocument();
        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();

    });

});