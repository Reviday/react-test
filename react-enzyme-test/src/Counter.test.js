import React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

describe('<Counter />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper).toMatchSnapshot();
  });
  it('has initial number', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper.state().number).toBe(0);
  });
  it('increase', () => {
    const wrapper = shallow(<Counter />);
    wrapper.instance().handleIncrease();
    expect(wrapper.state().number).toBe(1);
  });
  it('decrease', () => {
    const wrapper = shallow(<Counter />);
    wrapper.instance().handleDecrease();
    // Case 1. state 직접 조회.
    expect(wrapper.state().number).toBe(-1);
  });
  it('calls handleIncrease', () => {
    // 클릭 이벤트를 시뮬레이트 하고, state를 확인
    const wrapper = shallow(<Counter />);
    // findWhere 함수를 사용하여 조건에 해당하는 버튼 태그를 찾았습니다.
    const minusButton = wrapper.findWhere(
      (node) => node.type() === 'button' && node.text() === '-1'
    );
    minusButton.simulate('click');
    // Case 2. h2 태그를 조회하여 값을 확인.
    const number = wrapper.find('h2');
    expect(number.text()).toBe('-1');
  });
});
