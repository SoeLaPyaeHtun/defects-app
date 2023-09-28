import React, { useEffect, useRef, useState } from 'react'
import { Camera } from "react-camera-pro";

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import DrawSketch from './DrawSketch';
import DrawRectangle from './DrawRectangle';

const _Cam = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<Object | null>(null);
  const [image, setImage] = useState<string | any>("");
  const camera = useRef<any>(null);


  const getCameraPermission = async () => {

    if ("MediaRecorder" in window) {

      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        setPermission(true);
        setStream(streamData);
      } catch (err) {
        if (err instanceof Error)
          alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const takePhoto = () => {
    if (camera.current) {
      setImage(camera.current.takePhoto())
    }
  }



  return (
    <div>

      <div className='w-full flex flex-col justify-center items-center'>

        {/* <div className='w-1/4'> {image !== "" && <DrawSketch imageEncode={image} />}</div>
    <div className='px-10'></div> */}
        <div className='w-1/4'> {image !== "" && <DrawRectangle imageEncode={image} />}</div>
      </div>

      <div className='relative'>
        <main>
          <div>
            {!permission ? (
              <button onClick={getCameraPermission} type="button">
                Get Camera
              </button>
            ) : null}
            {permission ? (
              <div className='w-1/4 h-1/4'>
                <Camera ref={camera} aspectRatio={8 / 8} errorMessages={{ "noCameraAccessible": "Can not access to web cam" }} />
                <button onClick={takePhoto}>Take photo</button>
                <h1>{image}</h1>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default _Cam