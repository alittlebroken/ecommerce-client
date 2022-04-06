// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import CheckoutSuccess  from './CheckoutSuccess';

describe('<CheckoutSuccess />', () => {

    it('should render the component', async () => {

        /**
         * Render the component
         */
        render(<CheckoutSucess />);

        /**
         * Check the component behaves as we expect it to
         */
        expect(screen).not.toBeNull();

        /**
         * Check the success message appears
         */
        const successMessage = "Thank you for your order. Please check the order within your profile for further updates.";
        expect(screen.getByText(successMessage)).toBeInTheDocument();

    });

});