import React, { useRef, useEffect, useState } from 'react';
import DrawRectangle from './DrawRectangle';

const Camera = () => {
    const videoRef = useRef(null);
    //const [isFrontCamera, setIsFrontCamera] = useState(false);
    const [facingMode, setFacingMode] = useState('environment');
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [size, setSize] = useState(null)



    useEffect(() => {
        // setIsFrontCamera(facingMode === 'user');

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
    }, [facingMode, capturedPhoto]);

    const toggleFacingMode = () => {
        setFacingMode((prevMode) =>
            prevMode === 'environment' ? 'user' : 'environment'
        );
    };

    const takePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.clientWidth;
            canvas.height = videoRef.current.clientHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            // You can now work with the captured image (e.g., save it or display it)
            const photoDataUrl = canvas.toDataURL('image/png');
            console.log(videoRef.current.clientHeight)
            setCapturedPhoto(photoDataUrl);
            setSize({
                width: canvas.width,
                height: canvas.height
            })

        }
    };
    console.log(size)

    return (
        <div className="camera-container">
            {
                capturedPhoto === null ?
                    <div>
                        <button onClick={toggleFacingMode}>Switch Camera</button>
                        <video ref={videoRef} autoPlay playsInline muted className="camera-preview"></video>
                        <div className="camera-controls">

                            <button onClick={takePhoto} className="camera-button">
                                Take Photo
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <DrawRectangle imageEncode={capturedPhoto} size={size} />
                            <button onClick={() => { setCapturedPhoto(null) }}> retake </button>
                        </div>

                    </div>

            }



        </div>
    );
};

export default Camera;
