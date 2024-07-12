import Axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateUserQualification } from '../../redux/admin/QualificationSlice'








const AddContent = ({editFormState, toggleEditForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const qualifications = useSelector(state => state.qualifications.qualifications)
    const qualification = qualifications.find(qualification => qualification._id === editFormState._id)

    const generateYearsRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [title, setTitle] = useState(qualification.title)
    const [from, setFrom] = useState(qualification.from)
    const [to, setTo] = useState(qualification.to)
    const [text, setText] = useState(qualification.text)
    const [featured, setFeatured] = useState(qualification.is_featured)
    const [years, setYears] = useState([])
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [fromAlert, setFromAlert] = useState('')
    const [toAlert, setToAlert] = useState('')
    const [textAlert, setTextAlert] = useState('')

    const addNewQualification = () => {
        if(token){
            const content = {
                title: title,
                text: text,
                from: from,
                to: to,
                token: token,
                featured: featured,
                _id: qualification._id
            }
            initErrorAlert() //initialize form input error alert
            const validate = validate_input(content)
            if(validate === false) return 
            setButton(true)
            
            Axios.post(url('/api/admin/edit-user-qualification'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(UpdateUserQualification(data.qualification))
                    alertNotification('success', 'Qualification Updated successfully!')
                    initFormInput() //init fields
                    toggleForm(false)
                }else if(data.status === 'catch-error'){
                    console.log(data.catchError)
                }
                return setButton(false)
            }).catch(error => {
                setButton(false)
                console.log(error)
            })
        }
    }

  
    // generate years
    const generateYears = () => {
        const years = [];
        const stopYear = 1990
        const currentYear = new Date().getFullYear();
        const startYear = currentYear || 2024; // Default start year if not provided
        for (let i = startYear; i >= stopYear; i--) {
            years.push(i)
        }
        setYears(years)
    }

    // close add form
    const toggleForm = (state) => {
        toggleEditForm(state)
        initErrorAlert()
        initFormInput()
        setButton(false)
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setTitleAlert('')
        setFromAlert('')
        setToAlert('')
        setTextAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setTitle('')
        setFrom('')
        setTo('')
        setText('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setTitleAlert(error.title)
        setFromAlert(error.from)
        setToAlert(error.to)
        setTextAlert(error.text)
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
            setTitleAlert(`*Must be maximum of 50 characters`)
        }
        if(input.from === ''){
            failed = true
            setFromAlert(`*From Year field is required`)
        }else if(input.from > input.to){
            failed = true
            setFromAlert(`*From Year must not be greater than To Year`)
        }
        if(input.to === ''){
            failed = true
            setToAlert(`*To Year field is required`)
        }
        if(input.text.length === 0){
            failed = true
            setTextAlert(`*Text field is required`)
        } else if(input.text.length < 3){
            failed = true
            setTextAlert(`*Must be minimum of 3 characters`)
        }else if(input.text.length > 1000){
            failed = true
            setTextAlert(`*Must be maximum of 1000 characters`)
        }
        if(failed === true){
            return false
        }else{
            return true
        }
    }


    generateYearsRef.current = generateYears
    
    useEffect(() => {
        generateYearsRef.current()
    }, [])


    return (
        <div className={`app-content-form ${toggleEditForm ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>EDIT QUALIFICATION</h3>
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
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>From:</label>
                            <div className="form-group">
                                <select onChange={(e) => setFrom(e.target.value)} value={from} className="form-control">
                                    <option value="">Select Year</option>
                                    {years.map(year => (<option key={year} value={year}>{year}</option> ))}
                                </select>
                            </div>
                            <FormInputAlert alert={fromAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>To:</label>
                            <div className="form-group">
                                <select onChange={(e) => setTo(e.target.value)} value={to} className="form-control">
                                    <option value="">Select Year</option>
                                    {years.map(year => (<option key={year} value={year}>{year}</option> ))}
                                </select>
                            </div>
                            <FormInputAlert alert={toAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <label>Text:</label>
                            <div className="form-group">
                                <textarea className="form-control" onChange={(e) => setText(e.target.value)}  value={text} rows="4" cols="50" placeholder="Write Message..."></textarea>
                            </div>
                            <FormInputAlert alert={textAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group form-toggle">
                                <label>Feature Qualification: </label>
                                <FontAwesomeIcon onClick={() => setFeatured(!featured)} className={`icon ${featured ? 'active' : ''}`} icon={featured ? faToggleOn : faToggleOff} />
                            </div>
                        </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => addNewQualification()} type="button">EDIT QUALIFICATION</button>
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


export default AddContent