import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="">Hello, World!</h1>
      <button className="" onClick={() => setCount(count + 1)} type="button">
        Count: {count}
      </button>
    </>
  );
}

export default App;
