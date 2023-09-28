import React, { useRef, useEffect, useState } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
    <button onClick={toggleFacingMode}>Toggle Camera</button>

  useEffect(() => {
    setIsFrontCamera(facingMode === 'user');

    const constraints = {
      video: { facingMode },
    };

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    initCamera();
  }, [facingMode]);


  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front camera, 'environment' for back camera

  const toggleFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === 'environment' ? 'user' : 'environment'
    );
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // You can now work with the captured image (e.g., save it or display it)
      const photoDataUrl = canvas.toDataURL('image/png');
      console.log('Captured photo data URL:', photoDataUrl);
    }
  };

  return (
    <div className="camera-container">
          <button onClick={toggleFacingMode}>Toggle Camera</button>
      <video ref={videoRef} autoPlay playsInline muted className="camera-preview"></video>
      <div className="camera-controls">
        <button onClick={toggleFacingMode} className="camera-button">
          {isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}
        </button>
        <button onClick={takePhoto} className="camera-button">
          Take Photo
        </button>
      </div>
    </div>
  );
};

export default Camera;
