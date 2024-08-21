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
import { url, ClientUrl } from '../../../File'
import { useDispatch } from 'react-redux'
import { AddReviewRequest } from '../../redux/admin/ReviewRequestSlice'
import { Validate } from '../../../helper/Validation'









const AddContent = ({addFormState, toggleAddForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    let token = Cookies.get('Eloquent_token')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [project, setProject] = useState('')
   
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [projectAlert, setProjectAlert] = useState('')

    const SendReviewRequest = () => {
        initErrorAlert() //initialize form input error alert
        if(token){
            const content = {
                name: name,
                email: email,
                project: project,
                token: token,
                link: ClientUrl(),
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            setButton(true)
            Axios.post(url('/api/admin/send-review-request'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(AddReviewRequest(data.requestReview))
                    alertNotification('success', 'Review Request sent successfully!')
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
        toggleAddForm(state)
        initErrorAlert()
        initFormInput()
        setButton(false)
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setNameAlert('')
        setEmailAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setName('')
        setEmail('')
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
        <div className={`app-content-form ${addFormState ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>SEND REVIEW REQUEST</h3>
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
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter email"/>
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
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => SendReviewRequest()} type="button">SEND REQUEST</button>
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




