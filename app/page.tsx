'use client'
import Head from 'next/head';
import Camera from './components/Camera';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Camera App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <Camera />
      </main>
    </div>
  );
}
