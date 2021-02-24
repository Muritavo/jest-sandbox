import React, { useState } from 'react';

export default function () {
  const [count, setCount] = useState(0);

  const syncFunc = () => {
    setCount((prev) => prev + 1);
  };

  const asyncFunc = async () => {
    await new Promise<void>((r) => {
      setTimeout(() => {
        setCount((prev) => prev + 1);
        r();
      }, 1000);
    });
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={syncFunc} data-testid="sync">Sync</button>
      <button onClick={asyncFunc} data-testid="async">Async</button>
    </div>
  );
}