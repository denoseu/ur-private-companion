import React from 'react';
import './App.css';
import Cloud from './components/Cloud';

function RadialCircle() {
  return <div className='radial-circle'></div>;
}

function App() {
  return (
    <div className='app'>
      <RadialCircle />
      <h3>denise is here with you! :)</h3>
      <Cloud />
    </div>
  );
}

export default App;
