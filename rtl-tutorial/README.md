## react-testing-library 사용법

[react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)에서는 Enzyme과 달리 모든 테스트를 DOM 위주로 진행합니다. 그리고 컴포넌트의 props나 state를 조회하는 일은 없습니다. 컴포넌트를 리팩토링하게 될 때에는 주로 내부 구조 및 네이밍은 많이 바뀔 수 있어도 실제 작동 방식은 크게 바뀌지 않습니다. react-testing-library는 이 점을 중요시 여겨서, **컴포넌트의 기능이 똑같이 작동한다면 컴포넌트의 내부 구현 방식이 많이 바뀌어도 테스트가 실패하지 않도록 설계**되었습니다. 추가적으로, Enzyme은 엄청나게 다양한 기능을 제공하는 반면, react-testing-library에는 정말 필요한 기능들만 지원을 해줘서 매우 가볍고, 개발자들이 일관성 있고 좋은 관습을 따르는 테스트 코드를 작성할 수 있도록 유도해 줍니다.

### 1. 리액트 프로젝트 생성

```bash
$ npx create-react-app rtl-tutorial
# 혹은 yarn create react-app rtl-tutorial
```

### 2. 설치

이제는 CRA로 설치한 경우, 기본적으로 `@testing-library/react`, `@testing-library/jest-dom`가 설치되어 있습니다. 현재 시점에서는 다음과 같이 라이브러리가 변경되었으니 참고 바랍니다.

- `react-testing-library` → `@testing-library/react` - [[React Testing Library 공식문서]](https://testing-library.com/docs/react-testing-library/intro)
- `jest-dom` → `@testing-library/jest-dom` - [[Jest Dom 공식문서]](https://testing-library.com/docs/ecosystem-jest-dom/)

src 디렉터리에 있는 setupTests.js 파일이 다음과 같이 되어있다면 넘어갑니다.

`**src/setupTests.js**`

```jsx
import '@testing-library/jest-dom';
```

### 3. 첫 번째 테스트 코드

username 과 name 을 props 로 넣어주면 이를 렌더링해주는 Profile 컴포넌트를 만들어봅시다.

`**src/Profile.js**`

```jsx
import React from 'react';

const Profile = ({ username, name }) => {
  return (
    <div>
      <b>{username}</b>
      <span>({name})</span>
    </div>
  );
};

export default Profile;
```

**`src/App.js`**

```jsx
import React from 'react';
import Profile from './Profile';

function App() {
  return <Profile username="reviday" name="윤성규" />;
}

export default App;
```

결과를 확인해 봅니다. `npm start` (혹은 `yarn start`)

![rtl-first-npm-start](/images/rtl-first-npm-start.png)

그리고, Profile 컴포넌트를 위한 테스트 코드를 작성해봅니다.

`**src/Profile.test.js**`

```jsx
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
```

react-testing-library 에서 컴포넌트를 렌더링 할 때에는 `render`라는 함수를 사용합니다. 이 함수가 호출되면 그 [결과물](https://testing-library.com/docs/react-testing-library/api/#render-result)에는 DOM을 선택할 수 있는 [다양한 쿼리](https://testing-library.com/docs/queries/about/)들과 `container`가 포함되어 있습니다. 여기서 `container`는 해당 컴포넌트의 최상위 `DOM`을 가리킵니다. 이를 가지고 스냅샷 테스팅을 할 수도 있습니다. 하지만, [이 곳](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)에 의하면 쿼리 사용을 권장하는 함수는 `render`의 결과물이 아닌, `screen`의 쿼리 함수들 입니다.

> The benefit of using **`screen`** is you no longer need to keep the **`render`** call destructure up-to-date as you add/remove the queries you need. You only need to type **`screen`.**and let your editor's magic autocomplete take care of the rest.
> 

이제 `npm test`(혹은 `yarn test`) 명령어를 실행해서 작성한 테스트가 잘 통과하는지 확인해봅니다.


### 4. 스냅샷 테스팅

스냅샷 테스팅이란, 렌더링된 결과가 이전에 렌더링한 결과와 일치하는지 확인하는 작업을 의미합니다.

![rtl-first-snap-testing](/images/rtl-first-snap-testing.png)

최초 실행의 경우, **“1 snapshot written.”** 와 같은 문구가 보여질 것이고, `__**snapshots__/Profile.test.js.snap`** 라는 파일이 생깁니다.

```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Profile /> matches snapshot 1`] = `
<div>
  <div>
    <b>
      reviday
    </b>
    <span>
      (
      윤성규
      )
    </span>
  </div>
</div>
`;
```

컴포넌트가 렌더링됐을 때 이 스냅샷과 일치하지 않으면 테스트가 실패합니다. 만약에 스냅샷을 업데이트 하고싶다면 테스트가 실행되고 있는 콘솔 창에서 `u` 키를 누르면 됩니다.