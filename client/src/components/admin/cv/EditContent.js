import Axios from 'axios'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faFilePdf,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateCv } from '../../redux/admin/CvSlice'
import { Validate } from '../../../helper/Validation'










const EditUserCv = ({editFormState, toggleEditForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const cvContents = useSelector(state => state.cvs.cvs)
    const cv_item = cvContents.find(cvContent => cvContent._id === editFormState._id)

    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [cv_title, setCv_Title] = useState(cv_item.cv_title)
    const [cv, setCv] = useState('')
    const [button, setButton] = useState(false)

    const [cvTitleAlert, setCvTitleAlert] = useState('')
    const [cvAlert, setCvAlert] = useState('')


    const SubmitUpdateCv = () => {
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
            formData.append('_id', cv_item._id)
             formData.append('token', token)
            formData.append('cv', cv)
            Axios.post(url('/api/admin/update-user-cv'), formData).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    setCvAlert(data.validationError.cvAlert)
                    setCvTitleAlert(data.validationError.cvTitleAlert)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(UpdateCv(data.updateCv))
                    alertNotification('success', 'CV edited successfully!')
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
        toggleEditForm(state)
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
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'cv title'){
                setCvTitleAlert(validate.error)
            }
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
                        <h3>EDIT CV</h3>
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
                         <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Upload CV:</label>
                                <input ref={imageRef} onChange={getImageFile} type="file" />
                                <FormInputAlert alert={cvAlert}/>
                            </div>
                        </Col>
                         <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div className="form-group">
                                <li className="text-success">{cv_item.cv}</li>
                                <FontAwesomeIcon className="file-icon" icon={faFilePdf} />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => SubmitUpdateCv()} type="button">UPDATE CV</button>
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


export default EditUserCv