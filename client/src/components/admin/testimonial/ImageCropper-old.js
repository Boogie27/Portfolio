import { useState, useRef, useEffect } from 'react';
import { user_image } from '../../../File';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';

const ImageCropper = ({ image, setIsImageUrl, toggeleImageWindow }) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });

  // This effect makes sure to initialize the crop with a 1:1 aspect ratio based on image load
  useEffect(() => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      const initialCrop = makeAspectCrop(
        { unit: '%', width: 50 }, 1, 
        naturalWidth,
        naturalHeight
      );
      setCrop(initialCrop);
    }
  }, [image]);

  const onCropComplete = (crop) => {
    if (crop?.width > 5 && crop?.height > 5 && imageRef.current) {
      generateCroppedImage(crop);
    }
  };

  const generateCroppedImage = (crop) => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!image || !crop || !crop.width || !crop.height) return;

    // Scale to natural image size
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Convert the crop size into pixel values
    const pixelCropX = crop.x * scaleX;
    const pixelCropY = crop.y * scaleY;
    const pixelCropWidth = crop.width * scaleX;
    const pixelCropHeight = crop.height * scaleY;

    // Adjust the canvas size to match the crop's pixel dimensions
    canvas.width = pixelCropWidth;
    canvas.height = pixelCropHeight;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the cropped image on the canvas
    ctx.drawImage(
      image,
      pixelCropX,
      pixelCropY,
      pixelCropWidth,
      pixelCropHeight,
      0,
      0,
      pixelCropWidth,
      pixelCropHeight
    );

    // Create a blob from the canvas and update the cropped image URL
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const blobUrl = URL.createObjectURL(blob);
        setCroppedImageUrl(blobUrl);
      },
      'image/jpeg',
      1
    );
  };

  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const initialCrop = makeAspectCrop(
      { unit: '%', width: 50 },
      1, // Aspect ratio 1:1
      naturalWidth,
      naturalHeight
    );
    setCrop(initialCrop);
  };

  const cropImage = () => {
    if (croppedImageUrl) {
      setIsImageUrl(croppedImageUrl);
      toggeleImageWindow('close');
    } else {
      console.log('No image was cropped!');
    }
  };

  return (
    <div className="image-cropper-container">
      <div className="image-cropper-inner">
        <div className="image-container">
          {image && (
            <>
              <ReactCrop
                crop={crop}
                aspect={1}  // Enforce 1:1 aspect ratio for square crop
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={onCropComplete}
              >
                <img
                  ref={imageRef}
                  src={image || user_image()}
                  onLoad={onImageLoad}
                  alt="preview"
                  style={{ maxWidth: '100%' }}
                />
              </ReactCrop>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          )}
        </div>
        <div className="image-cropper-btn">
          <button onClick={() => toggeleImageWindow('close')} type="button" className="cancel">
            Cancel
          </button>
          <button onClick={cropImage} type="button" className="crop">
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
