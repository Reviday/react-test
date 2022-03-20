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
