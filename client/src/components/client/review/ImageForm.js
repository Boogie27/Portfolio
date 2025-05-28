import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { user_image } from '../../../File'
import ImageCropper from './ImageCropper'





const ImageForm = ({ button, submitReview, setBase64, toggleForm }) => {
    const imageRef = useRef(null)
    const [image, setImage] = useState('')
    const [isImageUrl, setIsImageUrl] = useState(null)
    const [cropWindow, setCropWindow] = useState(false)


     // set image file
    const getImageFile = (e) => {
        const file = e.target.files
        if(file && file.length > 0){
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                const imageUrl = reader.result ? reader.result.toString() : '' 
                setImage(imageUrl)
                toggeleImageWindow(imageUrl)
            })
            reader.readAsDataURL(file[0])
        }
    }

    // open file picker
    const toggleImageInput = () => {
        return imageRef.current.click()
    }


     // toggle image crop window
     const toggeleImageWindow = (string) => {
        if(string === 'close'){
            clearFileInput()
            return setCropWindow(false)
        }
        return setCropWindow(true)
    }


    // clear file input
    const clearFileInput = () => {
        return imageRef.current.value = null
    }


    return (
        <div className="review-form image-form-container">
            <CancelButton toggleForm={toggleForm}/>
            <UploadButton toggleImageInput={toggleImageInput}/>
            <TitleHeader/>
            <PhotoImage isImageUrl={isImageUrl} imageRef={imageRef} getImageFile={getImageFile}/>
            <ActionButton button={button} submitReview={submitReview}/>
            {cropWindow ? (<ImageCropper image={image} setIsImageUrl={setIsImageUrl} setBase64={setBase64} toggeleImageWindow={toggeleImageWindow}/>) : null }
        </div>
    )
}


export default ImageForm




const CancelButton = ({ toggleForm }) => {
    return (
        <div className="cancel-button">
           <FontAwesomeIcon onClick={() => toggleForm(2)} className="icon" icon={faArrowLeft} />
        </div>
    )
}


const UploadButton = ({toggleImageInput}) => {
    return (
        <div className="upload-button">
           <FontAwesomeIcon onClick={() => toggleImageInput()} className="icon" icon={faCamera} />
        </div>
    )
}



const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>UPLOAD IMAGE</h3>
            <p>Please kindly upload your photo here</p>
        </div>
    )
}


const PhotoImage = ({isImageUrl, imageRef, getImageFile}) => {
    return (
        <div className="photo-image">
            <img src={isImageUrl ? isImageUrl : user_image()} alt={'profile'}/>
            <input type="file" ref={imageRef} style={{ display: 'none' }}  onChange={getImageFile}/>
        </div>
    )
}



const ActionButton = ({button, submitReview}) => {
    return (
        <div className="action-button">
           <button disabled={button} onClick={(e) => submitReview()}  type="button">
                {
                    button === true ? <>PLEASE WAIT...</> : <>SUBMIT REVIEW</>
                }
            </button>
        </div>
    )
}
