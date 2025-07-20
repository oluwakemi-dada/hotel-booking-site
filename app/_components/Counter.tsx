'use client';

import { useState } from 'react';

const Counter = ({ users }: any) => {
  const [count, setCount] = useState(0);



  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
};

export default Counter;
