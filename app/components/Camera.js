import React, { useEffect, useRef } from 'react';

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    }
  }, []);

  return (
    <div className="camera">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-preview"
      ></video>
      <style jsx>{`
        .camera {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        .camera-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}

export default Camera;
