import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// Import packages we are testing for
const Brand = require('../Brand/Brand');
const Search = require('../Search/Search');

describe('<App />', () => {

    it('renders the main site container', () => {
        // Create a shallow render of the app
        const wrap = shallow(<App />);

        // Does the app contain the site container
        expect(wrap.exists('#app-container')).toEqual(true);
    });

    describe('Header', () => {

        it('renders the header', () => {
            // Shallow render the app we are testing
            const wrap = shallow(<App />);
    
            //Does the header tag exist
            expect(wrap.exists('.app-header')).toEqual(true);
        });

        it('contains <Brand /> component', () => {

            // Warp the app to test
            const wrap = shallow(<App />);

            // Test for the correct component
            expect(wrap.exists(<Brand />)).toEqual(true);

        });

        it('contains <Search /> component', () => {

            // Wrap the interesting component
            const wrap = shallow(<App />);

            // Check the desired component exists
            expect(wrap.find('.search-form')).toEqual(true);

        });

        it('contains <ProfileIcon /> component', () => {

            // Wrap the interesting component
            const wrap = shallow(<App />);

            // Check the desired component exists
            expect(wrap.find(<ProfileIcon />)).toEqual(true);

        });

        it('contains <Cart /> component', () => {

            // Wrap the interesting component
            const wrap = shallow(<App />);

            // Check the desired component exists
            expect(wrap.find(<Cart />)).toEqual(true);

        });

    });

    describe('Main', () => {

        it('renders the main section', () => {
            // Shallow render the app we are testing
            const wrap = shallow(<App />);
            
            // Does the main tag exist
            expect(wrap.exists('#app-main')).toEqual(true);
        });

    });

});