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

/**
 * Mock functionality 
 */
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Test Suite
describe('<Product />', () => {

    afterEach(() => {
        jest.clearAllMocks();
        useDispatchMock.mockClear();
        useSelectorMock.mockClear();
    });

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => {});
        useSelectorMock.mockImplementation(selector => selector(mockStore));
    });

    const useDispatchMock = reactRedux.useDispatch;
    const useSelectorMock = reactRedux.useSelector;

    const mockStore = {
        search: {
            results: [
                {
                    product_id: 1,
                    name: 'Mocked product',
                    description: 'Mocked product description',
                    price: 1.99,
                    image_url: 'mockedProductImage.png',
                    in_stock: false
                }
            ]
        }
    }

    // Mock the react-router-dom for the tests
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: jest.fn().mockReturnValue({ product_id: 1}),
    }));

    it('renders a products details to the screen', () => {

        // Render the component
        render(<Product />);

        // Check the expected Product items appear
        // Product title
        expect(screen.getByText('Mocked product')).toBeInTheDocument();

        // Product Image
        expect(screen.getByAltText('Mocked product')).toBeInTheDocument();

        // Product Price
        expect(screen.getByText('£1.99')).toBeInTheDocument();

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
        render(<Product />);

        // Get the button we wish to test
        const addToCartButton = screen.getByRole('button', { name: 'Add' });
        userEvent.click(addToCartButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });

});