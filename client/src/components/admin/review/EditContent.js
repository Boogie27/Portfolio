import Axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faToggleOff,
    faToggleOn
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch } from 'react-redux'
import { UpdateReviewRequest } from '../../redux/admin/ReviewRequestSlice'
import { Validate } from '../../../helper/Validation'









const EditContent = ({editFormState, toggleEditForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    let token = Cookies.get('Eloquent_token')
    const [sendMail, setSendMail] = useState(false)
    const [name, setName] = useState(editFormState.content.name || '')
    const [email, setEmail] = useState(editFormState.content.email || '')
    const [project, setProject] = useState(editFormState.content.project || '')
   
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [projectAlert, setProjectAlert] = useState('')

    const EditReviewRequest = () => {
        initErrorAlert() //initialize form input error alert
        if(token){
            const content = {
                name: name,
                email: email,
                project: project,
                token: token,
                sendMail: sendMail,
                _id: editFormState.content._id,
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            setButton(true)
            Axios.post(url('/api/admin/update-review-request'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(UpdateReviewRequest(data.updatedReviewRequest))
                    alertNotification('success', 'Review Request updated successfully!')
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
        setNameAlert('')
        setEmailAlert('')
        setProjectAlert('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setEmailAlert(error.email)
        setProjectAlert(error.project)
    }

   

 // validate input
 const validate_input = (input) => {
    const content = [
        { field: 'name', input: input.name, maxLength: 50, minLength: 3, required: true },
        { field: 'email', input: input.email, email: true, required: true },
        { field: 'project', input: input.project, maxLength: 50, minLength: 3, required: true },
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'name'){
                setNameAlert(validate.error)
            }
            if(validate.field === 'email'){
                setEmailAlert(validate.error)
            }
            if(validate.field === 'project'){
                setProjectAlert(validate.error)
            }
            return false
        })
        return false
    }else{
        return 'success'
    }
}



    return (
        <div className={`app-content-form ${editFormState.state ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>UPDATE REVIEW REQUEST</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter name"/>
                                <FormInputAlert alert={nameAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter email"/>
                                <FormInputAlert alert={emailAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Project:</label>
                                <input type="text" onChange={(e) => setProject(e.target.value)} value={project} className="form-control" placeholder="Enter project"/>
                                <FormInputAlert alert={projectAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group form-toggle">
                                <label>Send Mail: </label>
                                <FontAwesomeIcon onClick={() => setSendMail(!sendMail)} className={`icon ${sendMail ? 'active' : ''}`} icon={sendMail ? faToggleOn : faToggleOff} />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => EditReviewRequest()} type="button">UPDATE REQUEST</button>
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


export default EditContent




