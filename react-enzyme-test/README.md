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
      <Profile username="reviday" name="윤성규" />
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
  // ...

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
    const wrapper = mount(<Profile username="reviday" name="윤성규" />);
    expect(wrapper).toMatchSnapshot();
  });
});
```

`mount` 함수를 통해서 만든 wrapper를 통해서 추후 props, DOM, state 조회 등을 할 수 있습니다.

테스팅 결과를 한 번 확인해 봅니다. `npm test` (혹은 `yarn test`)

![enzyme-snap-testing](/images/enzyme-snap-testing.png)

최초 실행의 경우, **“1 snapshot written.”** 와 같은 문구가 보여질 것이고, **`__snapshots__/Profile.test.js.snap`** 라는 파일이 생깁니다.

```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Profile /> matches sanpshot 1`] = `
<Profile
  name="윤성규"
  username="reviday"
>
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
</Profile>
`;
```

만약 컴포넌트를 수정하게 될 경우, 기존에 만들어진 snap 파일과 일치되지 않아 test 결과는 실패하게 될 것입니다.

![enzyme-snap-fail-testing](/images/enzyme-snap-fail-testing.png)

수정된 컴포넌트로 snap을 업데이트하고 싶다면, `u` 키를 누르면 됩니다.

### 4. Props 접근

Enzyme에서는 컴포넌트 인스턴스에 접근을 할 수 있습니다.

**`src/Profile.test.js`**

```jsx
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
  });
});
```

테스트를 진행하면 다음과 같은 결과가 나옵니다.

![enzyme-props-testing](/images/enzyme-props-testing.png)

### 5. DOM 확인

DOM에 원하는 텍스트가 나타나있는지 확인을 할 수 있습니다.

**`src/Profile.test.js`**

```jsx
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

    // find 함수를 사용하면 특정 DOM 요소를 선택할 수 있습니다.
    const boldElement = wrapper.find('b');
    expect(boldElement.contains('reviday')).toBe(true);
    const spanElement = wrapper.find('span');
    expect(spanElement.text()).toBe('(윤성규)');
  });
});
```

`find` 함수 사용법

1. tag: `find(’span’)`
2. id: `find(’#id’)`
3. class: `find(’.class’)`
4. Component Display Name: `find(’MyComponent’)`

### 6. 클래스형 컴포넌트의 테스팅

Counter 컴포넌트를 작성해 봅니다.

**`src/Counter.js`**

```jsx
import React from 'react';

class Counter extends React.Component {
  state = {
    number: 0,
  };
  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1,
    });
  };
  render() {
    return (
      <div>
        <h2>{this.state.number}</h2>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
```

Counter 컴포넌트를 테스트 해봅니다.

**`src/Counter.test.js`**

```jsx
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
    expect(wrapper.state().number).toBe(-1);
  });
});
```

여기서는 `mount` 대신에 `shallow`를 사용하였는데요. 이 둘의 차이는 컴포넌트 내부에 다른 리액트 컴포넌트가 존재할 때 이를 렌더링 하는가, 안하는가에 있습니다. 다음을 결과물을 보면 확실하게 알 수 있습니다.

`mount`

```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Counter /> matches snapshot 1`] = `
<Counter>
  <div>
    <h2>
      0
    </h2>
    <button
      onClick={[Function]}
    >
      +1
    </button>
    <button
      onClick={[Function]}
    >
      -1
    </button>
    <Profile
      name="윤성규"
      username="reviday"
    >
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
    </Profile>
  </div>
</Counter>
`;
```

`shallow`

```jsx
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Counter /> matches snapshot 1`] = `
<div>
  <h2>
    0
  </h2>
  <button
    onClick={[Function]}
  >
    +1
  </button>
  <button
    onClick={[Function]}
  >
    -1
  </button>
  <Profile
    name="윤성규"
    username="reviday"
  />
</div>
`;
```

추가적으로, 둘의 최상위 요소가 다른 점도 확인할 수 있습니다. `mount`에서는 최상위 요소가 Counter 컴포넌트인 반면에, `shallow`에서는 최상위 요소가 div 입니다.

### 7. DOM 이벤트 시뮬레이트

이번에는 내장 메소드를 직접 호출하는게 아니라, 버튼 클릭 이벤트를 시뮬레이트하여 기능이 잘 작동하는지 확인해보겠습니다.

**`src/Counter.test.js`**

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

describe('<Counter />', () => {
  // ...
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
```

버튼에 이벤트를 시뮬레이트 할 때에는 원하는 엘리먼트를 찾아서 `simulate` 함수를 사용합니다. 첫 번째 파라미터에는 이벤트 타입을 넣고, 두 번째 파라미터에는 이벤트 객체를 넣습니다. 만약 input에 change 이벤트를 발생시키는 경우엔 다음과 같이 작성합니다.

```jsx
input.simulate('change', {
  target: {
    value: 'hello world',
  },
});
```

### 8. 함수형 컴포넌트와 Hooks 테스팅

클래스형 컴포넌트의 테스팅에 이어서, Hooks를 사용하는 함수형 컴포넌트의 테스트 코드를 작성해봅니다.

**`src/HookCounter.js`**

```jsx
import React, { useCallback, useState } from 'react';

const HookCounter = () => {
  const [number, setNumber] = useState(0);
  // 예제와는 다르게, setState를 callback 형식으로 사용.
  const onIncrease = useCallback(() => {
    setNumber((prevNum) => prevNum + 1);
  }, []);
  const onDecrease = useCallback(() => {
    setNumber((prevNum) => prevNum - 1);
  }, []);
  return (
    <div>
      <h2>{number}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default HookCounter;
```

컴포넌트를 만들고 App에서 잘 렌더링 되는지 확인해봅니다.

**`src/App.js`**

```jsx
import HookCounter from './HookCounter';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <Profile username="reviday" name="홍길동" />
      <HookCounter />
    </div>
  );
}

export default App;
```

잘 작동하는 군요.

![hooks-counter-test.gif](/images/hooks-counter-test.gif)

이 컴포넌트를 위한 테스트 케이스를 작성해 보겠습니다. 함수형 컴포넌트에서는 클래스형 컴포넌트와 달리 인스턴스 메서드 및 상태를 조회할 방법이 없습니다. 추가적으로, Hooks를 사용하는 경우 꼭 `shallow`가 아닌 `mount`를 사용해야 합니다. 그 이유는, `useEffect` Hook은 `shallow`에서 작동하지 않고, 버튼 엘리먼트에 연결되어 있는 함수가 이전 함수를 가리키고 있기 때문에, 예를 들어 +1 버튼의 클릭 이벤트를 두 번 시뮬레이트 해도 결괏값이 2가 되는 게 아니라 1이 됩니다.

**`src/HookCounter.test.js`**

```jsx
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
```

## 정리

Enzyme의 [공식 문서](https://airbnb.io/enzyme/docs/api/)를 보면, Enzyme에 있는 더 많은 기능들을 볼 수 있습니다.
