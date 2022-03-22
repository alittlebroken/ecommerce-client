// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import Registration from './Registration';

// Test Suite
describe('<Registration />', () => {

    // We also want to mock the useSelector and UseDispatch functions
    const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');

    beforeEach(() => {
        // Reset the mocks
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    });

    it('renders the registration form', () => {

      // Render the component
      render(<Registration />);

      // Check that each component of the form is set
      expect(screen.getByRole('form')).toBeInTheDocument();

      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();

      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Already have an account? Login.'})).toHaveAttribute('href', '/login');

      expect(screen.getByAltText('bee with head in honeycomb')).toBeInTheDocument();

    });

    it('dispatches an action when the register button is pressed', () => {
        
        // Dispatch Mock
        const mockedDispatch = jest.fn();
        useDispatchMock.mockReturnValue(mockedDispatch);

        // Perform a sanity test to ensure it is not dispatched right away
        expect(mockedDispatch).not.toHaveBeenCalled();

        // The component we are testing
        render(<Registration />);

        // Get the button we wish to test
        const registerButton = screen.getByRole('button', { name: 'Register' });
        userEvent.click(registerButton);

        // Check that the dispatch method was called at least once
        expect(mockedDispatch).toHaveBeenCalledTimes(1);

    });

});