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
import Product from './Product';

 // generate the mock data we would usually pass to the card
 const mockProductData = {
    product_id: 17630,
    name: 'West Devonshire Queen Bee',
    price: 299.99,
    description: 'The finest queen in the british isles',
    image_url: null,
    in_stock: null 
 };

// Test Suite
describe('<Product />', () => {

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

    it('renders a products details to the screen', () => {

        // Mock the useParams fucntion
        jest.spyOn(ReactRouter,'useParams').mockReturnValueOnce({product_id: 1});

        // Render the component
        render(<Product />);

        // Check the expected Product items appear
        // Product title
        expect(screen.getByText('West Devonshire Queen Bee')).toBeInTheDocument();

        // Product Image
        expect(screen.getByAltText('West Devonshire Queen Bee')).toBeInTheDocument();

        // Product Price
        expect(screen.getByText('£299.99')).toBeInTheDocument();

        // Add to cart button
        expect(screen.getByRole('button', { name: 'Add' } )).toBeInTheDocument();

    });

    it('dispatches an action when add to cart button is clicked', () => {

        // Dispatch Mock
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test to ensure it is not dispatched right away
        expect(mockedDispatch).not.toHaveBeenCalled();

        // The component we are testing
        render(<Product data={mockProductData} />);

        // Get the button we wish to test
        const addToCartButton = screen.getByRole('button', { name: 'Add' });
        userEvent.click(addToCartButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });

});