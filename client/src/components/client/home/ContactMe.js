import { useState, useEffect, useRef, Fragment } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope,
  faBriefcase,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import HTMLReactParser from 'html-react-parser'
import { url } from '../../../File'
import Axios from 'axios'
import FormInputAlert from '../alert/FormInputAlert'














const ContactMe = ({ loader, alertNotification }) => {
    const FetchContactMeRef = useRef()
    const [contactMe, setContactMe] = useState({})

    // const contactMe = {
    //     title: "Contact Me?",
    //     form_text: "For your car we will do everything advice design in us repairs and maintenance We are the some preferred",
    //     header: "and Innovation",
    //     span: "Design",
    //     text: "For your car we will do everything For your car we will do everything advice design in us repairs and maintenance We are the some preferred advice design in us repairs and maintenance We are the some preferred",
    //     project_count: "100",
    //     review_count: "400",
    // }

    // fetch service header
    const FetchContactMe = () => {
        Axios.get(url('/api/cleint/fetch-client-contact-me')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setContactMe(data.contactMe)
            }else if(data.status === 'error'){
                console.log(data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    FetchContactMeRef.current = FetchContactMe

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchContactMeRef.current()
    }, [])

  return (
    <Fragment>
        { contactMe ? ( <ContactMeContent contactMe={contactMe}/>) : null }
    </Fragment>
  )
}

export default ContactMe



const ContactMeContent = ({contactMe}) => {
    return (
        <div className="get-in-touch-container">
        <div className="inner-get-in-touch">
                <Row className="show-grid">
                    <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                        <ContentLeft contactMe={contactMe}/>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                        <ContentRight contactMe={contactMe}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}



const ContentLeft = ({contactMe}) => {
    return (
        <div className="content-left">
            <div className="title-header">
                <h1>
                    { contactMe.span ? (<span>{contactMe.span} </span>) : null }
                    { contactMe.header ? (contactMe.header) : null }
                </h1>
            </div>
            <div className="body">
                {contactMe.text ? (HTMLReactParser(contactMe.text)) : null }
            </div>
            <div className="bottom-content">
            <Row className="show-grid">
                <BottomContent counter={contactMe.project_count} description={'Completed Projects'} icon={faBriefcase}/>
                <BottomContent counter={contactMe.review_count} description={'Client Reviews'} icon={faMagnifyingGlass}/>
            </Row>
            </div>
        </div>
    )
}





const BottomContent = ({counter, description, icon}) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="bottom-content-item">
                <ul>
                    <li>
                        <FontAwesomeIcon className="icon" icon={icon} />
                    </li>
                    <li className="counter">{counter > 1000 ? (counter + 'K+') : counter}</li>
                    <li className="description">{description}</li>
                </ul>
            </div>
        </Col>
    )
}



const ContentRight = ({contactMe}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [phoneAlert, setPhoneAlert] = useState('')
    const [messageAlert, setMessageAlert] = useState('')

    const SubmitContact = () => {
        initErrorAlert() //initialize form input error alert
        const content = {
            name: name,
            email: email,
            phone: phone,
            message: message,
        }
        const validate = validate_input(content)
        if(validate === false) return 


    }
    

    // validate input
    const validate_input = (input) => {
        let failed = false;
        initErrorAlert()

        if(input.name.length === 0){
            failed = true
            setNameAlert(`*Name field is required`)
        } else if(input.name.length < 3){
            failed = true
            setNameAlert(`*Must be minimum of 3 characters`)
        }else if(input.name.length > 50){
            failed = true
            setNameAlert(`*Must be maximum of 50 characters`)
        }
        if(input.email.length === 0){
            failed = true
            setEmailAlert(`*Email field is required`)
        }
        if(input.phone.length === 0){
            failed = true
            setPhoneAlert(`*Phone field is required`)
        } else if(input.phone.length < 11){
            failed = true
            setPhoneAlert(`*Must be minimum of 11 characters`)
        }else if(input.phone.length > 15){
            failed = true
            setPhoneAlert(`*Must be maximum of 15 characters`)
        }
        if(input.message.length === 0){
            failed = true
            setMessageAlert(`*Message field is required`)
        } else if(input.message.length < 3){
            failed = true
            setMessageAlert(`*Must be minimum of 20 characters`)
        }else if(input.message.length > 50){
            failed = true
            setMessageAlert(`*Must be maximum of 3000 characters`)
        }
        if(failed === true){
            return false
        }else{
            return true
        }
    }

    
    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setEmailAlert(error.email)
        setPhoneAlert(error.phone)
        setMessageAlert(error.header)
    }

    const initErrorAlert = () => {
        setNameAlert('')
        setEmailAlert('')
        setPhoneAlert('')
        setMessageAlert('')
    }


    return (
        <div className="content-right">
            <div className="title-header">
                <h3>{contactMe.title}</h3>
                <div className="description">{contactMe.form_text ? (HTMLReactParser(contactMe.form_text)) : null }</div>
                <div className="contact-form">
                    <div className="form-group">
                        <FormInputAlert alert={nameAlert}/>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter Name"/>
                    </div>
                    <div className="form-group">
                        <FormInputAlert alert={emailAlert}/>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}className="form-control" placeholder="Enter Email"/>
                    </div>
                    <div className="form-group">
                        <FormInputAlert alert={phoneAlert}/>
                        <input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} className="form-control" placeholder="Enter Phone"/>
                    </div>
                    <div className="form-group">
                        <FormInputAlert alert={messageAlert}/>
                        <textarea className="form-control" onChange={(e) => setMessage(e.target.value)} value={message} rows="4" cols="50" placeholder="Write Message..."></textarea>
                    </div>
                    <div className="form-button">
                        { 
                        button ? (
                            <button type="button">PLEASE WAIT...</button>
                        ) : (
                            <button onClick={() => SubmitContact()} type="button">
                                SUBMIT NOW
                                <FontAwesomeIcon className="icon" icon={faEnvelope} />
                            </button>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}