// React packages
import React from 'react';
import * as reactRedux from 'react-redux';

// Testing Packages
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Import testing utils
import{ render, screen } from '../../utils/test.util';

// Components to test
import Profile from './Profile';

describe('<Profile />', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // We also want to mock the useSelector and UseDispatch functions
    const useSelectorMock = jest.spyOn(reactRedux,'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux,'useDispatch');
    const useEffectMock = jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());

    beforeEach(() => {
        // Reset the mocks
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
        useEffectMock.mockClear();
    });


    it('renders the component', async () => {

        // Render the component
        render(<Profile />);

        // Check the component was actually rendered
        expect(screen).not.toBeNull();

    });

});