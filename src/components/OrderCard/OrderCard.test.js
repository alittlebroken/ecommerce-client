// React packages
import React from 'react';
import ReactRouter from 'react-router';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import OrderCard from './OrderCard';

describe('<OrderCard />', () => {

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
     });

     /**
      * Mock a passed in customer order
      */
     const customerOrder = {
        order_id: 1,
        user_id: 1,
        order_date: '2022-04-06 10:44:05.877',
        order_paid_for: false,
        order_notes: null,
        order_shipped: null,
        order_arrived: null,
        order_total_cost: 825.94
    };

    it('should render the component in the DOM', () => {

        /**
         * Render the componenet
         */
        render(<OrderCard key={customerOrder.order_id} data={customerOrder} />);

        /**
         * Check component appears in the DOM
         */
        expect(screen).not.toBeNull();

        /**
         * Click the more details link
         */
        const detailsLink = screen.getByRole('link', { name: 'Details'});
        userEvent.click(detailsLink);
        expect(detailsLink).toHaveBeenCalledTimes(1);
        expect(detailsLink).toHaveBeenCalledWith(`${BASE_URL}/users/1/orders/1`)

    });

});