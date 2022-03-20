import React from 'react';
import { mount } from 'enzyme';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches sanpshot', () => {
    // mount 함수는 Enzyme을 통하여 리액트 컴포넌트를 렌더링 해줍니다.
    const wrapper = mount(<Profile username="reviday" name="홍길동" />);
    expect(wrapper).toMatchSnapshot();
  });
});
