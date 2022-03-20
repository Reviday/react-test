import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches sanpshot', () => {
    // mount 함수는 Enzyme을 통하여 리액트 컴포넌트를 렌더링 해줍니다.
    const wrapper = mount(<Profile username="reviday" name="윤성규" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render username and name', () => {
    const wrapper = mount(<Profile username="reviday" name="윤성규" />);
    // 다음과 같이 컴포넌트의 props에 접근이 가능합니다.
    expect(wrapper.props().username).toBe('reviday');
    expect(wrapper.props().name).toBe('윤성규');

    // find 함수를 사용하면 특정 DOM 요소를 선택할 수 있습니다. querySelector 처럼 사용하면 됩니다.
    const boldElement = wrapper.find('b');
    expect(boldElement.contains('reviday')).toBe(true);
    const spanElement = wrapper.find('span');
    expect(spanElement.text()).toBe('(윤성규)');
  });
});
