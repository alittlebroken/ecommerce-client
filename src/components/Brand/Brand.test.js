import React from 'react';
import { shallow } from 'enzyme';
import Brand from './Brand';

describe('<Brand />', () => {
    it('renders the component', () => {
        // wrap the component we are testing
        const wrap = shallow(<Brand />);

        // Check the component
        expect(wrap.exists('#brand')).toEqual(true);
    });

    it('contains the brand name', () => {
        // Wrap the component being tested
        const wrap = shallow(<Brand />);

        // check for the existance of the brand name
        expect(wrap.find('#brand').text()).toEqual('Agora');
    })
})