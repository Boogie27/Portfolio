import Axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch, useSelector} from 'react-redux'
import { UpdateUserServices } from '../../redux/admin/ServiceSlice'








const EditService = ({editFormState, toggleEditForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const services = useSelector(state => state.services.services)
    const service = services.find(service => service._id === editFormState._id)
   
    let token = Cookies.get('Eloquent_token')
    const [title, setTitle] = useState(service.title)
    const [text, setText] = useState(service.text)
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [textAlert, setTextAlert] = useState('')

    const EditUserService = () => {
        if(token){
            initErrorAlert() //initialize form input error alert
            const validate = validate_input(title, text)
            if(validate === false) return 
            const content = {
                title: title,
                text: text,
                token: token,
                _id: service._id
            }
            setButton(true)
            Axios.post(url('/api/admin/edit-user-services'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(UpdateUserServices(data.service))
                    alertNotification('success', 'Updated successfully!')
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


    // close add form
    const toggleForm = (state) => {
        toggleEditForm(state)
        initErrorAlert()
        setButton(false)
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setTitleAlert('')
        setTextAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setTitle('')
        setText('')
    }

const validate_input = (title='', text='') => {
    let failed = false;
    initErrorAlert()

    if(title.length === 0){
        failed = true
        setTitleAlert(`*Title field is required`)
    } else if(title.length < 3){
        failed = true
        setTitleAlert(`*Must be minimum of 3 characters`)
    }else if(title.length > 50){
        failed = true
        setTitleAlert(`*Must be maximum of 100 characters`)
    }
    if(text.length === 0){
        failed = true
        setTextAlert(`*Text field is required`)
    } else if(text.length < 3){
        failed = true
        setTextAlert(`*Must be minimum of 6 characters`)
    }else if(text.length > 1000){
        failed = true
        setTextAlert(`*Must be maximum of 1000 characters`)
    }
    if(failed === true){
        return false
    }else{
        return true
    }
}



const inputErrorForBackend = (error) => {
    setTitleAlert(error.title)
    setTextAlert(error.text)
}

    return (
        <div className={`app-content-form ${editFormState.state ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>EDIT SERVICES</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    
                    <div className="form-group">
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter title"/>
                                    <FormInputAlert alert={titleAlert}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label>Text:</label>
                                <textarea className="form-control" rows="4" cols="50" onChange={(e) => setText(e.target.value)} value={text} placeholder="Write Message..."></textarea>
                                <FormInputAlert alert={textAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-button">
                                    { 
                                        button ? (
                                            <button type="button">PLEASE WAIT...</button>
                                        ) : (
                                            <button onClick={() => EditUserService()} type="button">EDIT SERVICE</button>
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


export default EditService