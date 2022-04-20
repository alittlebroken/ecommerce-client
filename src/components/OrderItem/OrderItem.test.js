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
import OrderItem from './OrderItem';

describe('<OrderItem >', () => {

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
      * Mock the details being passed into the component
      */
     const mockedData = {
        product_id: 1,
        name: 'Stainless steel smoker',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper metus ut quam venenatis semper.',
        price: 29.99,
        image_url: 'stainlesssteel_smoker.jpg',
        in_stock: true,
        quantity: 2,
        total: 59.98 
     };

     it('renders the component into the dom', async () => {

        /**
         * Render the component
         */
         render(<OrderItem data={mockedData} />);

        /**
         * Check it appears in the DOM
         */
        expect(screen).not.toBeNull();

     });

     it('displays an order item', async () => {

        /**
         * Render the component
         */
        render(<OrderItem data={mockedData} />);

        /**
         * Check to ensure the component was in the DOM
         */
        expect(screen).not.toBeNull();

        /**
         * Check the rendered data appears as expected
         */
        expect(screen.getByText('Stainless steel smoker')).toBeInTheDocument();
        expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper metus ut quam venenatis semper.')).toBeInTheDocument();
        expect(screen.getByText('£29.99')).toBeInTheDocument();
        expect(screen.getByText(2)).toBeInTheDocument();
        expect(screen.getByAltText('Stainless steel smoker')).toBeInTheDocument();
        expect(screen.getByText('£59.98')).toBeInTheDocument();

     });

});