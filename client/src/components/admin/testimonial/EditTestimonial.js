import Axios from 'axios'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { 
  faStar
} from '@fortawesome/free-regular-svg-icons'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url, user_image } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateTestimonial } from '../../redux/admin/TestimonialSlice'
import { Validate } from '../../../helper/Validation'
import ImageCropper from './ImageCropper'











const EditTestimonial = ({editFormState, toggleEditForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const testimonials = useSelector(state => state.testimonials.testimonials)
    const testimonial = testimonials.find(testimonial => testimonial._id === editFormState._id)

    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [name, setName] = useState(testimonial.name)
    const [jobTitle, setJobTitle] = useState(testimonial.job_title)
    const [image, setImage] = useState(testimonial.image)
    const [base64, setBase64] = useState('')
    const [cropWindow, setCropWindow] = useState(false)
    const [isImageUrl, setIsImageUrl] = useState(null)
    const [imageSource, setImageSource] = useState(testimonial.image)
    const [rating, setRating] = useState(testimonial.rating)
    const [email, setEmail] = useState(testimonial.email)
    const [description, setDescription] = useState(testimonial.description)
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [imageAlert, setImageAlert] = useState('')
    const [ratingAlert, setRatingAlert] = useState('')
    const [jobTitleAlert, setJobTitleAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    const editNewTestimonial = () => {
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
            initErrorAlert() //initialize form input error alert
            setButton(true)
            const formData = new FormData()
            formData.append('_id', editFormState._id)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('token', token)
            formData.append('rating', rating)
            formData.append('job_title', jobTitle)
            formData.append('image', base64)
            formData.append('description', description)
            Axios.post(url('/api/admin/edit-user-testimonnial'), formData).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(UpdateTestimonial(data.updateTestimonial))
                    alertNotification('success', 'Testimonial updated successfully!')
                    initFormInput() //init fields
                    toggleForm(false)
                    clearFileInput()
                    setIsImageUrl(null)
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
        return imageRef.current.value = ''
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
            reader.addEventListener('load', () => {
                const imageUrl = reader.result ? reader.result.toString() : '' 
                setImageSource(imageUrl)
                toggeleImageWindow(imageUrl)
            })
            reader.readAsDataURL(file[0])
        }
    }
     // toggle image crop window
     const toggeleImageWindow = (string) => {
        if(string === 'close'){
            clearFileInput()
            return setCropWindow(false)
        }
        return setCropWindow(true)
    }

    // close add form
    const toggleForm = (state) => {
        setImage('')
        toggleEditForm(state)
        initErrorAlert()
        initFormInput()
        clearFileInput()
        setButton(false)
        setIsImageUrl('')
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setNameAlert('')
        setRatingAlert('')
        setEmailAlert('')
        setImageAlert('')
        setJobTitleAlert('')
        setDescriptionAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setName('')
        setJobTitle('')
        setEmail('')
        setRating('')
        setImageAlert('')
        setDescription('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setEmailAlert(error.email)
        setRatingAlert(error.rating)
        setJobTitleAlert(error.job_title)
        setDescriptionAlert(error.description)
    }

   

 // validate input
 const validate_input = (input) => {
    const content = [
        { field: 'name', input: input.name, maxLength: 50, minLength: 3, required: true },
        { field: 'job_title', input: input.job_title, maxLength: 100, minLength: 3, required: true },
        { field: 'rating', input: input.rating, required: true },
        { field: 'email', input: input.email,  email: true, required: true },
        { field: 'description', input: input.description, maxLength: 2000, minLength: 3,  required: true }
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'name'){ setNameAlert(validate.error) }
            if(validate.field === 'email'){ setEmailAlert(validate.error) }
            if(validate.field === 'job_title'){ setJobTitleAlert(validate.error) }
            if(validate.field === 'rating'){ setRatingAlert(validate.error) }
            if(validate.field === 'description'){  setDescriptionAlert(validate.error) }
            return false
        })
        return false
    }else{
        return 'success'
    }
}



    return (
        <div className={`app-content-form ${editFormState ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>EDIT TESTIMONIAL</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group">
                                <div className="profile-image text-center">
                                    <FontAwesomeIcon  onClick={() => toggleImageInput()} className="icon" icon={faCamera} /> 
                                    <img src={isImageUrl ? isImageUrl : user_image(testimonial.image)} alt={'profile'}/>
                                </div>
                                <input type="file" ref={imageRef} style={{ display: 'none' }}  onChange={getImageFile} className="form-control" placeholder="Enter Image"/>
                                <FormInputAlert alert={imageAlert}/>
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
                                <label>Job Title:</label>
                                <input type="text" onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} className="form-control" placeholder="Job title"/>
                                <FormInputAlert alert={jobTitleAlert}/>
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
                                <label>Description:</label>
                                <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}  value={description} rows="4" cols="50" placeholder="Write Message..."></textarea>
                                <FormInputAlert alert={descriptionAlert}/>
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
                                        <button onClick={() => editNewTestimonial()} type="button">UPDATE TESTIMONIAL</button>
                                    )
                                }
                                
                            </div>
                        </Col>
                    </Row>
               </div>
            </div>
            {cropWindow ? (<ImageCropper image={imageSource} setIsImageUrl={setIsImageUrl} setBase64={setBase64} toggeleImageWindow={toggeleImageWindow}/>) : null }
        </div>
    )
}


export default EditTestimonial