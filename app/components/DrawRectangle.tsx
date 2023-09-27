import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';


interface IImgProps {
  imageEncode: string
}

const DrawRectangle: React.FC<IImgProps> = ({ imageEncode }) => {

  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const contextRef = useRef<HTMLCanvasElement | OffscreenCanvas | any>(imageEncode);
  const canvasRef = useRef<HTMLCanvasElement | OffscreenCanvas | any>(null);




  useEffect(() => {
    if (imageEncode !== "") {
      if (canvasRef && canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 500;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 3;
        const img = new Image()
        if (typeof imageEncode === "string" && context !== null) {
          img.src = imageEncode
          img.onload = () => {
            context.drawImage(img, 0, 0)
          }

          contextRef.current = context;

        }
      }
    }
  }, [imageEncode]);

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
        />
      </ReactCrop>

      <div>
        <a id="download_image_link" href="download_link" onClick={saveImageToLocal}>Download Image</a>
      </div>


    </div>
  )
}

export default DrawRectangle