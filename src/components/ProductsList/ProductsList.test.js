// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import ProductsList from './ProductsList';

// List of results
const mockResults = [
    {
        product_id: 1,
        name: 'Test product 1',
        description: 'Description for test product 1',
        price: 0.99,
        img_url: 'product1.jpg',
        in_stock: true
    },
    {
        product_id: 2,
        name: 'Test product 2',
        description: 'Description for test product 2',
        price: 1.99,
        img_url: 'product2.jpg',
        in_stock: false
    },
];

// Test Suite
describe('<ProductsList />', () => {

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

    it('renders a products list container with a header', () => {

        // The search term we are looking for
        const mockTerm = 'bee';

        // render the component
        render(<ProductsList searchTerm={mockTerm} searchResults={mockResults} />);

        // We should have title for the page of products
        expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    });

});