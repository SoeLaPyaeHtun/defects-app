import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';


interface IImgProps {
  imageEncode: string,
  size: {
    width: Number,
    height: Number
  }
}

const DrawRectangle: React.FC<IImgProps> = ({ imageEncode, size }) => {

  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const contextRef = useRef<HTMLCanvasElement | OffscreenCanvas | any>(imageEncode);
  const canvasRef = useRef<HTMLCanvasElement | OffscreenCanvas | any>(null);




  useEffect(() => {
    if (imageEncode !== "") {
      if (canvasRef && canvasRef.current) {
        const canvas = canvasRef.current;

        canvas.width = size.width;
        canvas.height = size.height;

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 3;
        const img = new Image()
        if (typeof imageEncode === "string" && context !== null) {
          img.src = imageEncode
          img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
            console.log(img.width)
          }

          contextRef.current = context;

        }
      }
    }
  }, [imageEncode, size]);

  const saveImageToLocal = (event: React.MouseEventHandler<HTMLCanvasElement> | any) => {
    contextRef.current.strokeRect(crop?.x, crop?.y, crop?.width, crop?.height);
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.png');
    let image_ = canvasRef.current.toDataURL('image/png');
    link.setAttribute('href', image_);
  };


  console.log(crop?.height)

  return (
    <div>
      <ReactCrop crop={crop} onChange={setCrop} >
        <canvas
          ref={canvasRef}
          className='border border-green-900'
        />
      </ReactCrop>
      <br />
      <br />
      <div>
        <a id="download_image_link" href="download_link" onClick={saveImageToLocal} className="border border-blue-600 p-2 m-5 rounded-lg">Download Image</a>
      </div>


    </div>
  )
}

export default DrawRectangle