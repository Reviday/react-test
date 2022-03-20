import React from 'react';
import { mount } from 'enzyme';
import HookCounter from './HookCounter';

describe('<HookCounter />', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<HookCounter />);
    expect(wrapper).toMatchSnapshot();
  });
  it('increase', () => {
    const wrapper = mount(<HookCounter />);
    const increaseButton = wrapper.findWhere(
      (node) => node.type() === 'button' && node.text() === '+1'
    );
    increaseButton.simulate('click');
    increaseButton.simulate('click');
    const number = wrapper.find('h2');
    expect(number.text()).toBe('2'); // text
  });
  it('decrease', () => {
    const wrapper = mount(<HookCounter />);
    const decreaseButton = wrapper.findWhere(
      (node) => node.type() === 'button' && node.text() === '-1'
    );
    decreaseButton.simulate('click');
    decreaseButton.simulate('click');
    const number = wrapper.find('h2');
    expect(number.text()).toBe('-2'); // text
  });
});
