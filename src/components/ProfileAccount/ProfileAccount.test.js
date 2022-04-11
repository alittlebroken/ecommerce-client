// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import ProfileAccount from './ProfileAccount';

describe('<ProfileAccount />', () => {

    /**
     * Mock the data we send to the component
     */
    const profileDataMock = {
        contact_number: null,
        email: "hulk@avengers.com",
        enabled: null,
        forename: null,
        join_date: null,
        last_logon: null,
        password: "$2a$10$1IKeAdC85P44xEpOxy.bAu7QHUD.ywbtJHFG6RWpytEZqfyvL6uju",
        roles: "Customer",
        surname: null,
        user_id: 1,
    }


    it('renders the component', async () => {

        /**
         * Render the component
         */
        render(<ProfileAccount data={profileDataMock} />);

        /**
         * Check the component appeasr in the DOM
         */
        expect(screen).not.toBeNull();

    });

    it('shows the form elements', async () => {

        /**
         * Render the component
         */
        render(<ProfileAccount data={profileDataMock} />);

        /**
         * Check the component appeasr in the DOM
         */
        expect(screen).not.toBeNull();

        /**
         * Check the form appears as it should
         */
        expect(screen.getByLabelText('Forename:')).toBeInDocument();
        expect(screen.getByLabelText('Surname:')).toBeInDocument();
        expect(screen.getByLabelText('Email:')).toBeInDocument();
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
        
    });

});