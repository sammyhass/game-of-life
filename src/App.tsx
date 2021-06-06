import React from 'react';
import './App.css';
import CellGrid from './CellGrid';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ marginTop: '10px' }}>
        <CellGrid />
      </div>
      <Footer />
    </div>
  );
}

export default App;
