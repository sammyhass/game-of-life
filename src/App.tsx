import React from 'react';
import './App.css';
import CellGrid from './CellGrid';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ marginTop: '10px' }}>
        <CellGrid />
      </div>
    </div>
  );
}

export default App;
