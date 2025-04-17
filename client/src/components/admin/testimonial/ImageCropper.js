import { useState, useRef} from 'react'
import { user_image } from '../../../File'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { centerCrop, makeAspectCrop} from 'react-image-crop'









const ImageCropper = ({image, setIsImageUrl, toggeleImageWindow}) => {

    const ImageRef= useRef(null)
    const canvasRef= useRef(null)
    const [croppedImageUrl, setCroppedImageUrl] = useState(null)
    const [is_complete, setIs_complete] = useState(false)
    const [crop, setCrop] = useState({ unit: '%',  x: 25,  y: 25,  width: 50, height: 50, })


const onCropComplete = () => {
    setIs_complete(crop)
    if (crop?.width && crop?.height && ImageRef.current) {
        generateCroppedImage(crop)
    }
}

const generateCroppedImage = (crop) => {
    const image = ImageRef.current
    const canvas = canvasRef.current
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    )

    // export this image to jpeg
    // const url = canvas.toDataURL('image/jpeg')
    // setCroppedImageUrl(url)
    canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const blobUrl = URL.createObjectURL(blob)
          setCroppedImageUrl(blobUrl);
        },
        "image/jpeg",
        1
      )
}


const  onImageLoad = (e) => {
    const {naturalWidth:width, naturalHeight: height} = e.currentTarget
    setCrop(
        centerCrop(
            makeAspectCrop({ unit: '%', width: 50}, 1, width, height),
                width, 
                height
            )
        )
}



const cropImage = () => {
    if(croppedImageUrl){
        setIsImageUrl(croppedImageUrl)
        return toggeleImageWindow('close')
    }
    console.log('No image was cropped!')
}




    return (
        <div className="image-cropper-container">
            <div className="image-cropper-inner">
                <div className="image-container">
                    {
                        image ? (<CropperFrame image={image} canvasRef={canvasRef} crop={crop} setCrop={setCrop} onCropComplete={onCropComplete} onImageLoad={onImageLoad} ImageRef={ImageRef}/>) : null
                    }
                </div>
                <div className="image-cropper-btn">
                    <button onClick={() => toggeleImageWindow('close')} type="button" className="cancel">Cancel</button>
                    <button onClick={() => cropImage()} type="button" className="crop">Crop</button>
                </div>
            </div>
        </div>
    )
}


export default ImageCropper




const CropperFrame = ({ image, crop, canvasRef, setCrop, ImageRef, onCropComplete, onImageLoad}) => {
    return (
        <ReactCrop
        crop={crop}
        aspect={1} 
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={onCropComplete}>
             <img ref={ImageRef} src={image ? image : user_image()} onLoad={onImageLoad} alt={image}/>
             <canvas ref={canvasRef} style={{ display: 'none'}}/>
        </ReactCrop>
    )
}