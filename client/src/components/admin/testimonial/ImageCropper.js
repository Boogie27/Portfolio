import { useState } from 'react';
import getCroppedImg from '../../../helper/Cropper'
import { user_image } from '../../../File'
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-easy-crop'







const ImageCropper = ({ image, setIsImageUrl, setBase64, toggeleImageWindow }) => {
    const [crop, setCrop] = useState({ x:0, y:0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedImage, setCroppedImage] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    
  

 
    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    // crop the image
    const cropImage = async () => {
        try {
          const croppedImage = await getCroppedImg(
            image,
            croppedAreaPixels,
            rotation
          )

          setBase64(croppedImage.base64)
          setIsImageUrl(croppedImage.blobUrl)
          setCroppedImage(croppedImage.blobUrl)
          toggeleImageWindow('close')
        } catch (e) {
          console.error(e)
        }
    }
 

 

  return (
    <div className="image-cropper-container">
      <div className="image-cropper-inner">
        <div className="image-container">
          {image && (
            <Cropper
                image={image || user_image()}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                rotation={rotation}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
            />
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
















// https://valentinh.github.io/react-easy-crop/



























