import React, { useState, useEffect } from 'react';
import './App.css';
import Cloud from './components/Cloud';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function RadialCircle() {
  return <div className='radial-circle'></div>;
}

function App() {
  const [message, setMessage] = useState("your partner isn't here yet :(");
  const [partnerCursor, setPartnerCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    socket.on('users', (connectedUsers) => {
      if (connectedUsers === 2) {
        setMessage('your partner is here, too!');
      } else {
        setMessage("your partner isn't here yet :(");
      }
    });

    // track cursor sendiri
    const handleMouseMove = (event) => {
      const position = { x: event.clientX, y: event.clientY };
      socket.emit('cursor', position);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // partner's cursor
    socket.on('cursor', (position) => {
      setPartnerCursor(position);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='app'>
      <RadialCircle />
      <h3>{message}</h3>
      <Cloud />
      <img
        src='cursor.png'
        alt='Partner cursor'
        style={{
          position: 'absolute',
          left: partnerCursor.x,
          top: partnerCursor.y,
          width: '10px',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
}

export default App;
