// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import Checkout from './Checkout';

// Mock some cart Content
const mockCart = [{
    cost: 1.99,
    quantity: 1,
    items: [
        {
            email: 'user1@test.com',
            cart_id: 1,
            quantity: 1,
            product_id: 1,
            name: 'Test Cart Item 1',
            description: 'Description for test cart item 1',
            price: 1.99,
            image_url: 'testcartitem.jpg',
            in_stock: true
        }
    ]
}]

// Test Suite
describe('<Checkout />', () => {

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

    it('renders the checkout', () => {

        // Render the component
        render(<Checkout />);

        // Check the component is in the DOM tree
        expect(screen).not.toBeNull();

    });

    it('places an order when the order button is clicked', async () => {

        // Mock the return values from the selectors
        useSelectorMock
         .mockReturnValue(mockCart.items)
         .mockReturnValue(mockCart.cost)

        // Mock the dispatch result
        const mockDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatch);

        // Sanity check the inital dispatch
        expect(mockDispatch).not.toHaveBeenCalled();
    
        // Check clicking the - button dispatches an action
        const orderButton = screen.getByRole('button', { name: 'Order' });
        userEvent.click(orderButton);

    });

});