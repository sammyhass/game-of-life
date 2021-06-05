import React, { useState } from 'react';
import './App.css';
import CellGrid from './CellGrid';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CellGrid />
    </div>
  );
}

export default App;
