// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import CheckoutCancel  from './CheckoutCancel';

describe('<CheckoutCancel />', () => {

    it('should render the component', async () => {

        /**
         * Render the component
         */
        render(<CheckoutCancel />);

        /**
         * Check the component behaves as we expect it to
         */
        expect(screen).not.toBeNull();

        /**
         * Check the success message appears
         */
        const cancelMessage = "Checkout cancelled. Have you forgotten something? We will keep your cart contents ready for when you wish to checkout again."
        expect(screen.getByText(cancelMessage)).toBeInTheDocument();

    });

});