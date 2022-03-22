// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Component to test
import Navigation from './Navigation';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

describe('<Navigation />', () => {

    it('renders the default component view to the screen when user is not authenticated', () => {

        // Create supporting vars
        const authToken = '';

        // Create the component
        render(<Navigation authenticated={authToken} />);

        // Check the component features
        expect(screen.getByRole('link', { name: 'Login'})).toHaveAttribute('href', '/login');
        expect(screen.getByRole('link', { name: 'Register'})).toHaveAttribute('href', '/register');

    });

    it('renders the authenticated component view to the screen when user is authenticated', () => {

        // Create supporting vars
        const authToken = 'authenticated';

        // Create the component
        render(<Navigation authenticated={authToken} />);

        // Check the component features
        expect(screen.getByRole('link', { name: 'Profile'})).toHaveAttribute('href', '/profile');
        expect(screen.getByRole('link', { name: 'Cart'})).toHaveAttribute('href', '/cart');
        expect(screen.getByRole('link', { name: 'Logout'})).toHaveAttribute('href', '/login');
    });

});