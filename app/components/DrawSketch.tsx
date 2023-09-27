import React, { useEffect, useRef, useState } from 'react'

interface IImgProps {
    imageEncode: string
}

interface IMouseProps {
    nativeEvent: any
}

const DrawSketch: React.FC<IImgProps> = ({ imageEncode }) => {
    const canvasRef = useRef<HTMLCanvasElement | OffscreenCanvas | any>(null);
    const contextRef = useRef<HTMLCanvasElement | OffscreenCanvas | any>(imageEncode);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (imageEncode !== "") {
            if (canvasRef && canvasRef.current) {
                const canvas = canvasRef.current;
                canvas.width = 500;
                canvas.height = 500;
                const context = canvas.getContext("2d");
                const img = new Image()
                if (typeof imageEncode === "string" && context !== null) {
                    img.src = imageEncode
                    img.onload = () => {
                        context.drawImage(img, 0, 0)
                    }
                    context.lineCap = "round";
                    context.strokeStyle = "black";
                    context.lineWidth = 5;
                    contextRef.current = context;
                }
            }
        }
    }, [imageEncode]);

    //start drawing
    const startDrawing: React.MouseEventHandler | React.TouchEventHandler = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    //drawing
    const draw: React.MouseEventHandler | React.TouchEventHandler = ({nativeEvent}) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();
    };

    //stop drawing
    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const saveImageToLocal = (event: React.MouseEventHandler<HTMLCanvasElement> | React.TouchEventHandler<HTMLCanvasElement> | any) => {
        let link = event.currentTarget;
        link.setAttribute('download', 'canvas.png');
        let image_ = canvasRef.current.toDataURL('image/png');
        link.setAttribute('href', image_);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
            <div>
                <a id="download_image_link" href="download_link" onClick={saveImageToLocal}>Download Image</a>
            </div>
        </div>
    )
}

export default DrawSketch