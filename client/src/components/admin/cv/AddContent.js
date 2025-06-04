import Axios from 'axios'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch } from 'react-redux'
import { AddUserCv } from '../../redux/admin/CvSlice'
import { Validate } from '../../../helper/Validation'












const AddContent = ({addFormState, toggleAddForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [cv_title, setCv_Title] = useState('')
    const [cv, setCv] = useState('')
    const [button, setButton] = useState(false)

    const [cvTitleAlert, setCvTitleAlert] = useState('')
    const [cvAlert, setCvAlert] = useState('')


    const addNewCV = () => {
        if(token){
            const content = {
                cv_title: cv_title,
                cv: cv,
            }
            setCvAlert('') //initialize form input error alert
            setCvTitleAlert('') //initialize form input error alert
            const validate = validate_input(content)
            if(validate !== 'success') return
            setButton(true)
            const formData = new FormData()
            formData.append('cv_title', cv_title)
            formData.append('token', token)
            formData.append('cv', cv)
            Axios.post(url('/api/admin/add-new-cv'), formData).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    setCvAlert(data.validationError.cvAlert)
                    setCvTitleAlert(data.validationError.cvTitleAlert)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(AddUserCv(data.createCv))
                    alertNotification('success', 'CV added successfully!')
                    setCv_Title('') //init fields
                    toggleForm(false)
                    clearFileInput()
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


    // close add form
    const toggleForm = (state) => {
        setCv_Title('')
        toggleAddForm(state)
        clearFileInput()
        setButton(false)
    }

     // set cv file
    const getImageFile = (e) => {
        const file = e.target.files
        if(file && file.length > 0){
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                const cvUrl = reader.result ? reader.result.toString() : '' 
                setCv(cvUrl)
            })
            reader.readAsDataURL(file[0])
        }
    }

   

 // validate input
 const validate_input = (input) => {
    const content = [
        { field: 'cv title', input: input.cv_title, maxLength: 50, minLength: 3, required: true },
        { field: 'Upload Cv', input: input.cv,  required: true },
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'cv title'){
                setCvTitleAlert(validate.error)
            }
             if(validate.field === 'Upload Cv'){
                setCvAlert(validate.error)
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
                        <h3>ADD NEW CV</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group">
                                <label>CV Title:</label>
                                <input type="text" onChange={(e) => setCv_Title(e.target.value)} value={cv_title} className="form-control" placeholder="Enter Title"/>
                                <FormInputAlert alert={cvTitleAlert}/>
                            </div>
                        </Col>
                         <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group">
                                <label>Upload CV:</label>
                                <input ref={imageRef} onChange={getImageFile} type="file" />
                                <FormInputAlert alert={cvAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => addNewCV()} type="button">ADD CV</button>
                                    )
                                }
                                
                            </div>
                        </Col>
                    </Row>
               </div>
            </div>
        </div>
    )
}


export default AddContent