'use client'
import Head from 'next/head';
import Camera from './components/Camera';
import { useState } from 'react';

export default function Home() {
  
    const [facingMode, setFacingMode] = useState('environment'); // 'user' for front camera, 'environment' for back camera

  const toggleFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === 'environment' ? 'user' : 'environment'
    );
  };

  return (
    <div className="container">
      <h1>Camera App</h1>
      <button onClick={toggleFacingMode}>Toggle Camera</button>
      <Camera facingMode={facingMode} />
    </div>
  );
  
}
