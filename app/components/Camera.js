// components/Camera.js
import { useState, useEffect, useRef } from 'react';

function Camera() {
  const videoRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: isFrontCamera ? 'user' : 'environment',
      },
    };

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isFrontCamera]);

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={toggleCamera}>Switch Camera</button>
    </div>
  );
}

export default Camera;
