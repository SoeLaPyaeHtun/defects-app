'use client'
import Head from 'next/head';
import Camera from './components/Camera';


export default function Home() {
  


  return (
    <div className="container">
      <h1>Camera App</h1>
    
      <Camera/>
    </div>
  );
  
}
