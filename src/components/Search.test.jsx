import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import chai, { expect } from 'chai';  
import chaiJestSnapshot from "chai-jest-snapshot";

chai.use(chaiJestSnapshot);

/** ---I combine two testing approaches: Snapshot Testing and Component logic testing---**/
/**
 * Snapshot Testing is a useful testing tool in case you want to be sure user interface hasn’t changed.
 **/
import { shallow, configure, mount } from 'enzyme';

import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() });

// skapa en mock fun.
const mockPrevent = jest.fn();

// Testing one isolated function, or one React component. Enzyme’s shallow() is a unit test.
describe('Search', () => {
    it(' render correctly ', () => {
        const funComponent = shallow(<Search />);

        expect(funComponent).to.matchSnapshot();
        // toMatchSnapshot() => method creates Snapshot itself
    });

    // Basic Fun-component rendering
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // Mock functions
    it('form gets submitted once', () => {
        const wrapper = shallow(<Search />);

        expect(wrapper.find('input').length).to.equal(2)
        // preventDefault-metod: läggs mock-fun
        wrapper.find('form').simulate("submit", {
            preventDefault: mockPrevent
        })
        expect(mockPrevent.mock.calls.length).to.equal(1)
    });

    it('change works', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.find('input[type="text"]').prop("value")).to.equal('');
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Changed' } });
        expect(wrapper.find('input[type="text"]').prop("value")).to.equal('Changed');
    });

});
