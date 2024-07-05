import Axios from 'axios'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch } from 'react-redux'
import { AddUserSkill } from '../../redux/admin/SkillSlice'








const AddSkills = ({addFormState, toggleAddForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [ratingAlert, setRatingAlert] = useState('')

    const addNewSkills = () => {
        if(token){
            const content = {
                title: title,
                rating: rating,
            }
            initErrorAlert() //initialize form input error alert
            const validate = validate_input(content)
            if(validate === false) return 
            setButton(true)
            const formData = new FormData()
            formData.append('image', image)
            formData.append('title', title)
            formData.append('rating', rating)
            formData.append('token', token)
            Axios.post(url('/api/admin/add-new-skills'), formData).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(AddUserSkill(data.newSkill))
                    alertNotification('success', 'Skill added successfully!')
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

    // fetch image from input
    const addRatingImage = (e) => {
        const file = e.target.files
        if(file && file.length > 0){
            setImage(file[0])
            setImagePreview(URL.createObjectURL(file[0]));
        }
    }

    // clear file input
    const clearFileInput = () => {
        return imageRef.current.value = '';
    }

    // close add form
    const toggleForm = (state) => {
        setImage('')
        toggleAddForm(state)
        initErrorAlert()
        initFormInput()
        clearFileInput()
        setButton(false)
        setImagePreview('')
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setTitleAlert('')
        setRatingAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setTitle('')
        setRating('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setTitleAlert(error.title)
        setRatingAlert(error.rating)
    }

    const validate_input = (input) => {
        let failed = false;
        initErrorAlert()

        if(input.title.length === 0){
            failed = true
            setTitleAlert(`*Title field is required`)
        } else if(input.title.length < 3){
            failed = true
            setTitleAlert(`*Must be minimum of 3 characters`)
        }else if(input.title.length > 50){
            failed = true
            setTitleAlert(`*Must be maximum of 100 characters`)
        }
        if(input.rating.length === ''){
            failed = true
            setRatingAlert(`*Rating field is required`)
        } else if(input.rating.length > 100){
            failed = true
            setRatingAlert(`*Must be maximum of 100 percent`)
        }
        if(failed === true){
            return false
        }else{
            return true
        }
    }




    return (
        <div className={`app-content-form ${addFormState ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>ADD NEW SKILL</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    
                    <div className="form-group">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter title"/>
                                <FormInputAlert alert={titleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>Rating:</label>
                            <input type="number" min="0" max="100" className="form-control" onChange={(e) => setRating(e.target.value)}  value={rating} placeholder="Enter Ratings"/>
                            <FormInputAlert alert={ratingAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>Image preview:</label>
                            <div className="image-preview">
                                {
                                    imagePreview ? (<img src={imagePreview} alt={'preview'}/>) : (<FontAwesomeIcon className="icon" icon={faCamera} />)
                                }
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>Image:</label>
                            <input type="file" className="form-control" ref={imageRef} onChange={addRatingImage}   placeholder="Upload Image"/>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => addNewSkills()} type="button">ADD SKILL</button>
                                    )
                                }
                                
                            </div>
                        </Col>
                    </Row>
                </div>
               </div>
            </div>
        </div>
    )
}


export default AddSkills