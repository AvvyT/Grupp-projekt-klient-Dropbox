import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';

/** ---I combine two testing approaches: Snapshot Testing and Component logic testing---**/
/**
 * Snapshot Testing is a useful testing tool in case you want to be sure user interface hasn’t changed.
 **/
import { shallow, configure, mount } from 'enzyme';

import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() });

// skapa en mock fun.
const mockPrevent = jest.fn();

describe('Search', () => {
    it('should render correctly in "debug" mode', () => {
        const funComponent = shallow(<Search debug />);

        expect(funComponent).toMatchSnapshot();
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

        expect(wrapper.find('input').length).toBe(2)
        // preventDefault-metod: läggs mock-fun
        wrapper.find('form').simulate("submit", {
            preventDefault: mockPrevent
        })
        expect(mockPrevent.mock.calls.length).toBe(1)
    });

    /**---Snapshot Testing---**/
    // event-test interacting with a child component // mount-test
    it('should be possible to activate form-submit with Spacebar', () => {
        const funComponent = mount(<Search />);
        funComponent
            .find('form')
            .simulate('keydown', { keyCode: 32 });
        expect(funComponent).toMatchSnapshot();
        funComponent.unmount();
    });

    
    it('should render banner text correctly with given strings', () => {
        const strings = ['one', 'two'];
        const funComponent = shallow(<Search list={strings} />);
        expect(funComponent).toMatchSnapshot();
    });

});