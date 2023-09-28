// src/Camera.js
import React from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const CameraContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const useCamera = () => {
  const webcamRef = React.useRef(null);

  return (
    <CameraContainer>
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={true} // Flip the camera view if necessary
        style={{ width: '100%', height: '100%' }}
      />
    </CameraContainer>
  );
};

export default useCamera;
