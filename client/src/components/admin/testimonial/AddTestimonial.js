import Axios from 'axios'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url, user_image } from '../../../File'
import { useDispatch } from 'react-redux'
import { AddTestimonials } from '../../redux/admin/TestimonialSlice'
import { Validate } from '../../../helper/Validation'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { makeAspectCrop, centerCrop, convertToPixelCrop } from 'react-image-crop'




const ASPECT_RATIO = 1
const MIN_DIMENSION = 200




const AddTestimonial = ({addFormState, toggleAddForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const cropImageRef = useRef(null)
    const previewImageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [crop, setCrop] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [image, setImage] = useState(user_image())
    const [imageSource, setImageSource] = useState('')
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [ratingAlert, setRatingAlert] = useState('')
    const [jobTitleAlert, setJobTitleAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    const addNewTestimonial = () => {
        initErrorAlert() //initialize form input error alert
        if(token){
            const content = {
                name: name,
                email: email,
                rating: rating,
                job_title: jobTitle,
                description: description,
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            setButton(true)
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('token', token)
            formData.append('job_title', jobTitle)
            formData.append('rating', rating)
            formData.append('description', description)
            Axios.post(url('/api/admin/add-new-testimonnial'), formData).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(AddTestimonials(data.testimonial))
                    alertNotification('success', 'Testimonial added successfully!')
                    initFormInput() //init fields
                    toggleForm(false)
                }
                return setButton(false)
            }).catch(error => {
                setButton(false)
                console.log(error)
            })
        }
    }

    // clear file input
    const clearFileInput = () => {
        return imageRef.current.value = '';
    }
    // open file picker
    const toggleImageInput = () => {
        return imageRef.current.click()
    }

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
                        return alertNotification('error', 'Image must be at least 200 x 200 pixels!')
                    }
                })
                setImageSource(imageUrl)
            })
            reader.readAsDataURL(file[0])
        }
    }


    // handle word count
    const handleTextChange = (string) => {
        const words = string.trim().split(/\s+/)
        const filterWords = words.filter((word) => word.length > 0)
        if(filterWords.length <= 50){
            setDescription(string)
            setWordCount(filterWords.length)
        }
    }

    

    // close add form
    const toggleForm = (state) => {
        toggleAddForm(state)
        initErrorAlert()
        initFormInput()
        clearFileInput()
        setButton(false)
        setCrop('')
        setImageSource('')
        setImage(user_image())
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setNameAlert('')
        setEmailAlert('')
        setRatingAlert('')
        setJobTitleAlert('')
        setDescriptionAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setName('')
        setEmail('')
        setJobTitle('')
        setRating('')
        setDescription('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setEmailAlert(error.email)
        setRatingAlert(error.rating)
        setJobTitleAlert(error.jobTitle)
        setDescriptionAlert(error.description)
    }

   

 // validate input
 const validate_input = (input) => {
    const content = [
        { field: 'name', input: input.name, maxLength: 50, minLength: 3, required: true },
        { field: 'job title', input: input.job_title, maxLength: 100, minLength: 3, required: true },
        { field: 'rating', input: input.rating, required: true },
        { field: 'email', input: input.email, email: true,  required: true },
        { field: 'description', input: input.description, wordCount: 50, minLength: 3,  required: true }
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'name'){ setNameAlert(validate.error)}
            if(validate.field === 'email'){ setEmailAlert(validate.error)}
            if(validate.field === 'job title'){ setJobTitleAlert(validate.error)}
            if(validate.field === 'rating'){ setRatingAlert(validate.error) }
            if(validate.field === 'description'){ setDescriptionAlert(validate.error) }
            return false
        })
        return false
    }else{
        return 'success'
    }
}





    return (
        <div className={`app-content-form ${addFormState ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>ADD NEW TESTIMONIAL</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group">
                                <div className="profile-image text-center">
                                    <FontAwesomeIcon  onClick={() => toggleImageInput()} className="icon" icon={faCamera} /> 
                                    <img src={image}  alt={'profile'}/>
                                </div>
                                <input type="file" ref={imageRef} style={{ display: 'none' }}  onChange={getImageFile} className="form-control" placeholder="Enter Image"/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter name"/>
                                <FormInputAlert alert={nameAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter email"/>
                                <FormInputAlert alert={emailAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Job Title:</label>
                                <input type="text" onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} className="form-control" placeholder="Job title"/>
                                <FormInputAlert alert={jobTitleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea className="form-control" onChange={(e) => handleTextChange(e.target.value)}  value={description} rows="4" cols="50" placeholder="Write Message..."></textarea>
                                <FormInputAlert alert={descriptionAlert}/>
                                <div className="word-count"><b>Max words:</b> {wordCount} / 50</div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Ratings: </label>
                                <span className="rating">
                                    {
                                    [...Array(5)].map((current, index) => (
                                        <FontAwesomeIcon key={index}  onClick={(e) => setRating(index + 1)} className={`star ${index <= rating - 1 ? 'active' : ''}`} icon={faStar} /> 
                                    ))
                                    }
                                    0/5
                                </span>
                                <FormInputAlert alert={ratingAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => addNewTestimonial()} type="button">ADD TESTIMONIAL</button>
                                    )
                                }
                                
                            </div>
                        </Col>
                        { imageSource ? (<CropperFrame imageSource={imageSource} setImage={setImage} clearFileInput={clearFileInput} cropImageRef={cropImageRef} previewImageRef={previewImageRef} setImageSource={setImageSource} crop={crop} setCrop={setCrop}/>) : null }
                    </Row>
               </div>
            </div>
        </div>
    )
}


export default AddTestimonial






const CropperFrame = ({imageSource, setImageSource, crop, setCrop, setImage, clearFileInput, previewImageRef, cropImageRef}) => {
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


    const toggleCropper = () => {
        setCrop('')
        clearFileInput()
        return setImageSource('')
    }

    // update profile image 
    const updateUserImage = (dataURL) => {
        setImage(dataURL)
        clearFileInput()
        return setImageSource('')
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
        <div className="cropper-frame-container">
            <div className="dark-skin"></div>  
            <div className="inner-cropper-frame">
                <div className="cropper-frame">
                    <ReactCrop onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)} crop={crop} circularCrop keepSelection aspect={ASPECT_RATIO} minWidth={MIN_DIMENSION}>
                        <img src={imageSource} ref={cropImageRef} onLoad={onImageLoad} alt="cropper"/>
                    </ReactCrop>
                </div>
                <div className="button">
                    <button type="button" onClick={() => toggleCropper()} className="cancel">Cancle</button>
                    <button type="button" onClick={() => cropUserImage()} className="crop-image">Crop Image</button>
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