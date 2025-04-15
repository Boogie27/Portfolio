import Axios from 'axios'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faStar,
    faTimes,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url, user_image } from '../../../File'
import { useDispatch } from 'react-redux'
import { AddUserTestimonial } from '../../redux/admin/TestimonialSlice'
import { Validate } from '../../../helper/Validation'
import ImageCropper from './ImageCropper'











const AddTestimonial = ({addFormState, toggleAddForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [name, setName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [image, setImage] = useState('')
    const [isImageUrl, setIsImageUrl] = useState(null)
    const [imageSource, setImageSource] = useState('')
    const [rating, setRating] = useState('')
    const [description, setDescription] = useState('')
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [ratingAlert, setRatingAlert] = useState('')
    const [jobTitleAlert, setJobTitleAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    const addNewTestimonial = () => {
        if(token){
            const content = {
                name: name,
                rating: rating,
                job_title: jobTitle,
                description: description,
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            initErrorAlert() //initialize form input error alert
           
            setButton(true)
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
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
                    dispatch(AddUserTestimonial(data.testimonial))
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
        return imageRef.current.value = null
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
     const toggeleImageWindow = (imageUrl) => {
        if(imageUrl !== 'close'){
            return setIsImageUrl(imageUrl)
        }
        clearFileInput()
        return setIsImageUrl(null)
    }

    // close add form
    const toggleForm = (state) => {
        setImage('')
        toggleAddForm(state)
        initErrorAlert()
        initFormInput()
        clearFileInput()
        setButton(false)
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setNameAlert('')
        setRatingAlert('')
        setJobTitleAlert('')
        setDescriptionAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setName('')
        setJobTitle('')
        setRating('')
        setDescription('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
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
        { field: 'description', input: input.description, maxLength: 2000, minLength: 3,  required: true }
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){
                setNameAlert(validate.error)
            }
            if(validate.field === 'job_title'){
                setJobTitleAlert(validate.error)
            }
            if(validate.field === 'rating'){
                setRatingAlert(validate.error)
            }
            if(validate.field === 'description'){
                setDescriptionAlert(validate.error)
            }
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
                                    <img src={user_image()} alt={'profile'}/>
                                </div>
                                <input type="file" ref={imageRef} style={{ display: '' }}  onChange={getImageFile} className="form-control" placeholder="Enter Image"/>
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
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
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
                                        <button onClick={() => addNewTestimonial()} type="button">ADD TESTIMONIAL</button>
                                    )
                                }
                                
                            </div>
                        </Col>
                    </Row>
               </div>
            </div>
            {isImageUrl ? (<ImageCropper toggeleImageWindow={toggeleImageWindow}/>) : null }
        </div>
    )
}


export default AddTestimonial