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
import Cart from './Cart';

describe('<Cart />', () => {

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
        // Render the selected component
        render(<Cart />);

        // Check if the component has indded rendered
        expect(screen).not.toBeNull();

    });

    it('shows how many items are currently in the cart on the main icon', async () => {
       
        // Mock the selectors used in this component
        useSelectorMock
         // Number of items in the cart
         .mockReturnValue(1)
         // Cost of items in the cart
         .mockReturnValue(1.99)
         // The cart items themselves
         .mockReturnValue([{
             product_id: 1,
             name: 'Mocked Product',
             description: 'Description for mocked product',
             price: 1.99,
             quantity: 1,
             image_url: 'mockedproduct.png',
             in_stock: true
         }]);

        // Render the selected component
        render(<Cart />);

        // Check that what is rendered matches what we expect it to

        // Number of items in the cart
        expect(screen.getByText(1)).toBeInTheDocument();

        // Cart price
        expect(screen.getByText(1.99)).toBeInTheDocument();

    });

    it('dispatches an action when the delete link is clicked on an item', async () => {

        // Mock the selectors used in this component
        useSelectorMock
         // Number of items in the cart
         .mockReturnValue(1)
         // Cost of items in the cart
         .mockReturnValue(1.99)
         // The cart items themselves
         .mockReturnValue([{
             product_id: 1,
             name: 'Mocked Product',
             description: 'Description for mocked product',
             price: 1.99,
             quantity: 1,
             image_url: 'mockedproduct.png',
             in_stock: true
         }]);

        // Dispatch Mock
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test to ensure it is not dispatched right away
        expect(mockedDispatch).not.toHaveBeenCalled();

        // Render the selected component
        render(<Cart />);

        // Get the button we wish to test
        const addToCartButton = screen.getByRole('link', { name: 'Remove' });
        userEvent.click(addToCartButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });

    it('dispatches an action when the update link is clicked on an item', async () => {
        
        // Mock the selectors used in this component
        useSelectorMock
         // Number of items in the cart
         .mockReturnValue(1)
         // Cost of items in the cart
         .mockReturnValue(1.99)
         // The cart items themselves
         .mockReturnValue([{
             product_id: 1,
             name: 'Mocked Product',
             description: 'Description for mocked product',
             price: 1.99,
             quantity: 1,
             image_url: 'mockedproduct.png',
             in_stock: true
         }]);

        // Dispatch Mock
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test to ensure it is not dispatched right away
        expect(mockedDispatch).not.toHaveBeenCalled();

        // Render the selected component
        render(<Cart />);

        // Get the button we wish to test
        const addToCartButton = screen.getByRole('link', { name: 'Update' });
        userEvent.click(addToCartButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);


    });

    it('dispatches an action to start the order process for the cart', async () => {

        // Mock the selectors used in this component
        useSelectorMock
         // Number of items in the cart
         .mockReturnValue(1)
         // Cost of items in the cart
         .mockReturnValue(1.99)
         // The cart items themselves
         .mockReturnValue([{
             product_id: 1,
             name: 'Mocked Product',
             description: 'Description for mocked product',
             price: 1.99,
             quantity: 1,
             image_url: 'mockedproduct.png',
             in_stock: true
         }]);

        // Dispatch Mock
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test to ensure it is not dispatched right away
        expect(mockedDispatch).not.toHaveBeenCalled();

        // Render the selected component
        render(<Cart />);

        // Get the button we wish to test
        const addToCartButton = screen.getByRole('button', { name: 'Order' });
        userEvent.click(addToCartButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });

});