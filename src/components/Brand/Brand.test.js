// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Component to test
import Brand from './Brand';

describe('<Brand />', () => {

    it('displays the brand name', () => {
        
        // Name of the site to display in the brand
        const siteName = 'The VegPalace';

        // Render the component
        render(<Brand appName={siteName}/>);

        // Check the site name is listed
        expect(screen.getByText(siteName)).toBeInTheDocument();

    });

    it('contains a link back to the home page', () => {
        
        // Render the component
        render(<Brand appName="The Hive" />);

        expect(screen.getByRole('link', { name: 'The Hive'})).toHaveAttribute('href', '/');

    })
})