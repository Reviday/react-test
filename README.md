# React TDD

벨로퍼트님의 [**[벨로퍼트와 함께하는 리액트 테스팅](https://learn-react-test.vlpt.us/#/)**] 글을 보고 공부를 진행했습니다.

**그 외 참고 사이트**

- [TDD란? 테스트 주도 개발](https://hanamon.kr/tdd%EB%9E%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C/) - [하나몬](https://hanamon.kr/about/)

## TDD

TDD란 Test Driven Development의 약자로 ‘테스트 주도 개발’이라고 하며, 테스트가 개발을 이끌어 나가는 형태의 개발론을 말합니다. 

[[출처]: 하나몬 - [TDD란? 테스트 주도 개발](https://hanamon.kr/tdd%EB%9E%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C/) ](/images/TDD-개발주기.webp)

[출처]: 하나몬 - [TDD란? 테스트 주도 개발](https://hanamon.kr/tdd%EB%9E%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C/) 

### TDD의 세 가지 절차

1. **실패(Write a failing test)**
    
    첫 번째 절차는 실패입니다. 실패하는 테스트 케이스를 만드는 단계입니다. 작은 단위의 기능 하나씩 테스트 케이스를 작성합니다.
    
2. **성공(Make the test pass)**
    
    두 번째 절차는 성공입니다. 앞서 실패하는 테스트 케이스를 통과시키기 위하여 **코드를 작성하는 단계**입니다. 
    
3. **리팩토링(Refactor)**
    
    세 번째 절차는 리팩토링입니다. 중복 코드를 제거하거나 코드를 개선하는 등의 작업을 진행하는 단계입니다. 리팩토링을 진행하고도 테스트 케이스가 성공하는지 확인합니다.
    

### TDD의 장점

- 코드의 모듈화
- 테스트 커버리지가 높아지며, 리팩토링 및 유지보수가 쉬워진다.
- 버그에 낭비하는 시간을 최소화할 수 있다.
- 구현한 기능이 요구사항을 충족하는지 쉽게 확인 가능하다.

### TDD의 단점

- 가장 큰 단점은 바로 생산성의 저하

## 리액트 컴포넌트의 테스트

리액트 컴포넌트를 테스팅 할 때에는 **`[react-dom/test-utils](https://reactjs.org/docs/test-utils.html)`**안에 들어있는 유틸 함수를 사용해서 테스트 코드를 작성할 수 있으나, 여러가지로 복잡하고 불편한 요소가 있기 때문에 테스팅 라이브러리를 사용 하는것을 **[리액트 공식문서](https://reactjs.org/docs/test-utils.html#overview)**에서도 권장하고 있습니다.

### 테스트 라이브러리

1. **`[Enzyme](https://airbnb.io/enzyme/)`**
: 컴포넌트가 지니고 있는 props, state 를 확인하고, 컴포넌트의 내장 메서드를 직접 호출하는 등의 내부 기능을 자주 접근합니다.
2. **`[react-testing-library](https://git.io/react-testing-library)`**
    
    : 실제 DOM 에 대해서 신경을 더 많이 쓰고, 컴포넌트의 인스턴스에 대해서 신경쓰지 않고, 실제 화면에 무엇이 보여지는지, 그리고 어떠한 이벤트가 발생했을때 화면에 원하는 변화가 생겼는지 이런 것을 확인하기에 조금 더 최적화 되어있습니다. 그래서 사용자 관점에서의 테스팅에 용이합니다.


## Enzyme 사용법

### 1. 리액트 프로젝트 생성

```bash
$ npx create-react-app react-enzyme-test
# 혹은 yarn create react-app react-enzyme-test
```

CRA로 만드는 프로젝트에는 Jest가 포함되어있기 때문에 별도 설치가 필요 없습니다. VS Code를 사용하는 경우, IDE 지원을 위해 `@types/jest`를 별도로 추가 설치합니다.

![enzyme-compatiblility](/images/enzyme-compatiblility.png)

현재, CRA로 프로젝트를 만들 경우, react와 react-dom이 자동으로 17버전으로 생성이 될 것입니다. 하지만, **Enzyme은 현재 16버전까지만 호환**이 되므로 아래와 같이 추가적으로 명령을 수행해서 다운그레이드 해주어야 합니다.

```bash
$ npm install react@16.14.0 react-dom@16.14.0
# 또는 yarn add react@16.14.0 react-dom@16.14.0
```

### 2. 설치

다음 명령을 수행해서 라이브러리를 설치합니다.

```bash
$ npm install --save enzyme enzyme-adapter-react-16 
# 또는 yarn add enzyme enzyme-adapter-react-16
```

src 디렉터리에 있는 setupTests.js 파일을 다음과 같이 수정합니다.

**`src/setupTests.js`**

```jsx
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

그 다음 아래 컴포넌트를 생성하거나 수정합니다.

**`src/Profile.js`**

```jsx
import React from 'react';

const Profile = ({ usename, name }) => {
  return (
    <div>
      <b>{usename}</b>
      <span>({name})</span>
    </div>
  );
};

export default Profile;
```

**`src/App.js`**

```jsx
import Profile from './Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Profile username="reviday" name="홍길동" />
    </div>
  );
}

export default App;
```

결과를 확인해 봅니다. `npm start` (혹은 `yarn start`)

![enzyme-first-npm-start](/images/enzyme-first-npm-start.png)

### 3. 스냅샷 테스팅

스냅샷 테스팅이란, 렌더링된 결과가 이전에 렌더링한 결과와 일치하는지 확인하는 작업을 의미합니다. `enzyme-to-json` 라이브러리를 추가로 설치합니다.

```bash
$ npm install enzyme-to-json
# 또는 yarn add enzyme-to-json
```

그런 다음, `package.json` 파일에 `jest` 설정을 추가합니다.

```json
{
	...

  "jest": {
    "snapshotSerializers": ["enzyme-to-json/serializer"]
  }
}
```

이제 본격적인 테스팅을 해보기 위해서 다음과 같은 파일을 작성합니다.

**`src/Profile.test.js`**

```jsx
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
```

`mount` 함수를 통해서 만든 wrapper를 통해서 추후 props, DOM, state 조회 등을 할 수 있습니다.

테스팅 결과를 한 번 확인해 봅니다. `npm test` (혹은 `yarn test`) 

![enzyme-snap-testing](/images/enzyme-snap-testing.png)

최초 실행의 경우, **“1 snapshot written.”** 와 같은 문구가 보여질 것이고, `__**snapshots__/Profile.test.js.snap`** 라는 파일이 생깁니다.

```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Profile /> matches sanpshot 1`] = `
<Profile
  name="홍길동"
  username="reviday"
>
  <div>
    <b>
      reviday
    </b>
    <span>
      (
      홍길동
      )
    </span>
  </div>
</Profile>
`;
```

만약 컴포넌트를 수정하게 될 경우, 기존에 만들어진 snap 파일과 일치되지 않아 test 결과는 실패하게 될 것입니다. 

![enzyme-snap-fail-testing](/images/enzyme-snap-fail-testing.png)

수정된 컴포넌트로 snap을 업데이트하고 싶다면, `u` 키를 누르면 됩니다.