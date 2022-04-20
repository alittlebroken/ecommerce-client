// React packages
import React from 'react';
import ReactRouter from 'react-router';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import OrdersList from './OrdersList';

/**
 * Mock the order data
 */
const mockData = [
    {
        order_id: 1,
        user_id: 1,
        order_date: "2022-04-06 10:44:05.877",
        order_paid_for: true,
        order_notes: null,
        order_shipped: null,
        order_arrived: null,
        order_total_cost: 825.94
    },
    {
        order_id: 2,
        user_id: 1,
        order_date: "2022-04-06 11:05:38",
        order_paid_for: true,
        order_notes: null,
        order_shipped: "2022-04-06 13:00:01",
        order_arrived: null,
        order_total_cost: 825.94
    },
    {
        order_id: 10,
        user_id: 1,
        order_date: "2022-04-07 19:15:57",
        order_paid_for: true,
        order_notes: null,
        order_shipped: "2022-04-08 9:30:00",
        order_arrived: "2022-04-09 13:45:27",
        order_total_cost: 379.98
    },
];

describe('<OrdersList />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // We also want to mock the useSelector and UseDispatch functions
    const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');

    beforeEach(() => {
        // Reset the mocks
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    it('renders the component into the dom', async () => {

        /**
         * Render the component
         */
        render(<OrdersList />);

        /**
         * Check it is in the DOM
         */
        expect(screen).not.toBeNull();

    });

});