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
import CartItem from './CartItem';

// Mock the data to use with the component
const mockCartItem = {
    product_id: 17630,
    name: 'West Devonshire Queen Bee',
    price: 299.99,
    description: 'The finest queen in the british isles',
    image_url: null,
    in_stock: null 
 };

describe('<CartItem />', () => {

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

    it('renders to the screen', async () => {

        // Render the component
        render(<CartItem data={mockCartItem}/>);

        // Check if the component has indded rendered
        expect(screen).not.toBeNull();

    });

    it('should display a cart item', async () => {

        // Render the component
        render(<CartItem data={mockCartItem}/>);

        expect(screen.getByText('West Devonshire Queen Bee')).toBeInTheDocument();
        expect(screen.getByAltText('West Devonshire Queen Bee')).toBeInTheDocument();
        expect(screen.getByText(299.99)).toBeInTheDocument();

    });

    it('should update the cart when quantity updated', async () => {

        // Mock the dispatcher
        const mockDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatch);

        // Sanity check it was not called right away
        expect(mockDispatch).not.haveBeenCalled();

        // Render component to the screen
        render(<CartItem data={mockCartItem}/>);

        // Get the update button
        const updateQtyButton = screen.getByRole('button', { name: 'Update' });
        userEvent.click(updateQtyButton);

        // Check that the dispatch method was called at least once
        expect(mockDispatch).toHaveBeenCalledTimes(1);

    });

    it('should start the order process when the order button is clicked', async () => {

        // Mock the dispatcher
        const mockDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatch);

        // Sanity check it was not called right away
        expect(mockDispatch).not.haveBeenCalled();

        // Render component to the screen
        render(<CartItem data={mockCartItem}/>);

        // Get the update button
        const orderButton = screen.getByRole('button', { name: 'Order' });
        userEvent.click(orderButton);

        // Check that the dispatch method was called at least once
        expect(mockDispatch).toHaveBeenCalledTimes(1);

    });

});