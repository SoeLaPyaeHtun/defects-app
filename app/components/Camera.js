import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const [facingMode, setFacingMode] = useState('user'); // 'user' for front camera, 'environment' for back camera
  const webcamRef = useRef(null);

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    );
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={facingMode === 'environment'}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: facingMode }}
        style={{ width: '100%', height: 'auto' }}
      />
      <button onClick={toggleCamera}>Switch Camera</button>
    </div>
  );
};

export default Camera;
