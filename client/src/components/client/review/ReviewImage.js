import { useState, Fragment, useRef } from 'react'
import { 
    faUser,
    faArrowLeft,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { makeAspectCrop, centerCrop, convertToPixelCrop } from 'react-image-crop'
import FormInputAlert from '../alert/FormInputAlert'







const ASPECT_RATIO = 1
const MIN_DIMENSION = 200










const ReviewImage = ({togglePages, image, setImage, toggleForm, errorMessage, setErrorMessage, SubmitReview}) => {
    const imageRef = useRef(null)
    const cropImageRef = useRef(null)
    const previewImageRef = useRef(null)
    const [crop, setCrop] = useState('')
    const [imageSource, setImageSource] = useState()


     // set image file
     const getImageFile = (e) => {
        const file = e.target.files
        if(file && file.length > 0){
            const reader = new FileReader()
            const imageElement = new Image()
            reader.addEventListener('load', () => {
                const imageUrl = reader.result ? reader.result.toString() : ''
                imageElement.src = imageUrl

                imageElement.addEventListener("load", (e) => {
                    const { naturalWidth, naturalHeight } = e.currentTarget
                    if(naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION){
                        setCrop('')
                        setImageSource('')
                        clearFileInput()
                        return setErrorMessage('Image must be at least 200 x 200 pixels!')
                    }
                })
                setImageSource(imageUrl)
            })
            reader.readAsDataURL(file[0])
        }
    }

    // crop the image
    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget
        const cropWithPercent = (MIN_DIMENSION / width) * 100
        const cropped = makeAspectCrop(
            { unit: '%', width: cropWithPercent },
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(cropped, width, height)
        setCrop(centeredCrop)
    }

     // update profile image 
     const updateUserImage = (dataURL) => {
        clearFileInput()
        setImage(dataURL)
        setErrorMessage('')
        return setImageSource('')
    }

    // clear file input
    const clearFileInput = () => {
        return imageRef.current.value = '';
    }

    // open file picker
    const toggleImageInput = () => {
        return imageRef.current.click()
    }

    const cropUserImage = () => {
        setCanvasPreview(
            cropImageRef.current,
            previewImageRef.current,
            convertToPixelCrop(
                crop,
                cropImageRef.current.width,
                cropImageRef.current.height
            )
        )
        const dataURL = previewImageRef.current.toDataURL()
        updateUserImage(dataURL)
    }


    return (
    <div className="review-image-rating">
            <div className="title-header">
                <FontAwesomeIcon onClick={() => togglePages(3)} className="icon" icon={faArrowLeft} />
                <FontAwesomeIcon onClick={() => toggleImageInput()} className="icon-upload" icon={faCamera} />
            </div>
            <ReviewImageContent image={image} imageRef={imageRef} getImageFile={getImageFile} errorMessage={errorMessage} SubmitReview={SubmitReview}/>
            {
                imageSource ? (
                    <CropperFrame toggleForm={toggleForm} cropUserImage={cropUserImage} crop={crop} setCrop={setCrop} cropImageRef={cropImageRef} 
                    imageSource={imageSource} onImageLoad={onImageLoad} setCanvasPreview={setCanvasPreview} previewImageRef={previewImageRef}/> 
                ) : null
            }
        </div>
  )
}

export default ReviewImage




const ReviewImageContent = ({imageRef, image, SubmitReview, errorMessage, getImageFile}) => {
    return (
        <Fragment>
            <div className="review-image-body">
                <div className="image">
                    {
                        image ? (<img src={image} alt=""/>) : (<FontAwesomeIcon  className="icon" icon={faUser}/>)
                    }
                </div>
                <input type="file" ref={imageRef} style={{ display: 'none' }}  onChange={getImageFile} className="form-control" placeholder="Enter Image"/>
            </div>
            <div className="button">
                <button onClick={() => SubmitReview()} type="button">SUBMIT REVIEW</button>
                <FormInputAlert position='text-center' alert={errorMessage}/>
            </div>
        </Fragment>
    )
}



const CropperFrame = ({
    imageSource, onImageLoad, crop, setCrop,  previewImageRef, cropImageRef, cropUserImage, toggleForm
}) => {
    return (
        <div className="cropper-frame">
            <div className="dark-skin"></div>
            <div className="cropper-frame-body">
                <div className="frame">
                    <ReactCrop onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)} crop={crop} circularCrop keepSelection aspect={ASPECT_RATIO} minWidth={MIN_DIMENSION}>
                        <img src={imageSource} ref={cropImageRef} onLoad={onImageLoad} alt="cropper"/>
                    </ReactCrop>
                </div>
                <div className="crop-button">
                    <button type="button" onClick={() => toggleForm(false)} className="cancel">Cancel</button>
                    <button type="button" onClick={() => cropUserImage()} className="crop">Crop Image</button>
                </div>
                <canvas ref={previewImageRef} />
            </div>
        </div>
    )
}









const setCanvasPreview = (
    image, // HTMLImageElement
    canvas, // HTMLCanvasElement
    crop // PixelCrop
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
  
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();
  
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
  
    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
  
    ctx.restore();
}