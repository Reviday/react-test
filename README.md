# React TDD

벨로퍼트님의 [**[벨로퍼트와 함께하는 리액트 테스팅](https://learn-react-test.vlpt.us/#/)**] 글을 보고 공부를 진행했습니다. **버전이나, 라이브러리가 변경되어 블로그 내용과 다를 수 있습니다.**

**그 외 참고 사이트**

- [TDD란? 테스트 주도 개발](https://hanamon.kr/tdd%EB%9E%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C/) - [하나몬](https://hanamon.kr/about/)

## TDD

TDD란 Test Driven Development의 약자로 ‘테스트 주도 개발’이라고 하며, 테스트가 개발을 이끌어 나가는 형태의 개발론을 말합니다.

![TDD-개발주기](/images/tdd-development-cycle.webp)
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

리액트 컴포넌트를 테스팅 할 때에는 `react-dom/test-utils` 안에 들어있는 유틸 함수를 사용해서 테스트 코드를 작성할 수 있으나, 여러 가지로 복잡하고 불편한 요소가 있기 때문에 테스팅 라이브러리를 사용하는 것을 [리액트 공식문서](https://reactjs.org/docs/test-utils.html#overview)에서도 권장하고 있습니다.

### 테스트 라이브러리

1. **`Enzyme`** [Enzyme 사용법 정리](https://github.com/Reviday/react-test/tree/main/react-enzyme-test)

   : 컴포넌트가 지니고 있는 props, state 를 확인하고, 컴포넌트의 내장 메서드를 직접 호출하는 등의 내부 기능을 자주 접근합니다.

2. **`react-testing-library`** [react-testing-library 사용법 정리](https://github.com/Reviday/react-test/tree/main/rtl-tutorial)

   : 실제 DOM 에 대해서 신경을 더 많이 쓰고, 컴포넌트의 인스턴스에 대해서 신경쓰지 않고, 실제 화면에 무엇이 보여지는지, 그리고 어떠한 이벤트가 발생했을때 화면에 원하는 변화가 생겼는지 이런 것을 확인하기에 조금 더 최적화 되어있습니다. 그래서 사용자 관점에서의 테스팅에 용이합니다.
