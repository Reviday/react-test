import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('<Profile />', () => {
  it('matches snapshot', () => {
    const { container } = render(<Profile username="reviday" name="윤성규" />);
    expect(container).toMatchSnapshot();
  });
  it('shows the props correctly', () => {
    render(<Profile username="reviday" name="윤성규" />);
    // render함수의 getByText() 보다, screen의 getByText() 사용을 권장합니다.
    screen.getByText('reviday'); // reviday 라는 텍스트를 가진 엘리먼트가 있는지 확인
    screen.getByText('(윤성규)'); // (윤성규) 이라는 텍스트를 가진 엘리먼트가 있는지 확인
    screen.getByText(/윤/); // 정규식 /윤/ 을 통과하는 엘리먼트가 있는지 확인
  });
});
