import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'












const About = ({preloader, alertNotification, image, setImage }) => {
    const FetchUserAboutRef = useRef()
    let token = Cookies.get('Eloquent_token')


    const [title, setTitle] = useState('')
    const [header, setHeader] = useState('')
    const [span, setSpan] = useState('')
    const [text, setText] = useState('')
    const [featured, setFeatured] = useState(false)
    const [activity, setActivity] = useState('')
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [headerAlert, setHeaderAlert] = useState('')
    const [spanAlert, setSpanAlert] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [activityAlert, setActivityAlert] = useState('')

    

    const UpdateAbout = () => {
        if(token){
            initErrorAlert() //initialize form input error alert
            const validate = validate_input(title, header, span, text, activity)
            if(validate === false) return 
            const content = {
                title: title,
                token: token,
                header: header,
                text: text,
                span: span,
                featured: featured,
                activity: activity
            }
        
            setButton(true)
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/update-user-about'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    alertNotification('success', 'About Updated sucessfully!')
                    setTitle(data.about.title)
                    setHeader(data.about.header)
                    setSpan(data.about.span)
                    setText(data.about.text)
                    setImage(data.about.image)
                    setActivity(data.about.activity)
                    setFeatured(data.about.is_featured)
                }
                preloader(false)
                return setButton(false)
            }).catch(error => {
                setButton(false)
                preloader(false)
                console.log(error)
            })
        }
    }


    // validate input
    const validate_input = (title='', header='', span='', text='', activity='') => {
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
            setTitleAlert(`*Must be maximum of 50 characters`)
        }
        if(header.length === 0){
            failed = true
            setHeaderAlert(`*Header field is required`)
        } else if(header.length < 3){
            failed = true
            setHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(header.length > 50){
            failed = true
            setHeaderAlert(`*Must be maximum of 50 characters`)
        }
        if(span.length === 0){
            failed = true
            setSpanAlert(`*Span field is required`)
        } else if(span.length < 3){
            failed = true
            setSpanAlert(`*Must be minimum of 3 characters`)
        }else if(span.length > 50){
            failed = true
            setSpanAlert(`*Must be maximum of 50 characters`)
        }
        if(activity.length === 0){
            failed = true
            setActivityAlert(`*Activity field is required`)
        } else if(activity.length < 3){
            failed = true
            setActivityAlert(`*Must be minimum of 3 characters`)
        }else if(activity.length > 500){
            failed = true
            setActivityAlert(`*Must be maximum of 500 characters`)
        }
        if(text.length === 0){
            failed = true
            setTextAlert(`*Text field is required`)
        } else if(text.length < 3){
            failed = true
            setTextAlert(`*Must be minimum of 3 characters`)
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
        setHeaderAlert(error.header)
        setSpanAlert(error.span)
        setTextAlert(error.text)
        setActivityAlert(error.activity)
    }

    const initErrorAlert = () => {
        setTitleAlert('')
        setHeaderAlert('')
        setSpanAlert('')
        setTextAlert('')
        setActivityAlert('')
    }

    // fetch service header
    const FetchUserAbout = () => {
        preloader(true, 'Loading, please wait...')
        if(token){
            Axios.get(url(`/api/admin/fetch-user-about/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    setTitle(data.about.title)
                    setHeader(data.about.header)
                    setSpan(data.about.span)
                    setText(data.about.text)
                    setImage(data.about.image)
                    setFeatured(data.about.is_featured)
                    setActivity(data.about.activity)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
                alertNotification('error', 'Something went wrong!')
            })
        }
    }

    FetchUserAboutRef.current = FetchUserAbout

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchUserAboutRef.current()
    }, [])

    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="form-group">
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter Title"/>
                                    <FormInputAlert alert={titleAlert}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Header:</label>
                                <input type="text" onChange={(e) => setHeader(e.target.value)} value={header} className="form-control" placeholder="Enter Header"/>
                                <FormInputAlert alert={headerAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Span:</label>
                                <input type="text" onChange={(e) => setSpan(e.target.value)} value={span} className="form-control span" placeholder="Enter Span"/>
                                <FormInputAlert alert={spanAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label>Activity:</label>
                                <input type="text" onChange={(e) => setActivity(e.target.value)} value={activity} className="form-control" placeholder="Enter Activity"/>
                                <FormInputAlert alert={activityAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label>Text:</label>
                                <div className="form-group">
                                    <textarea className="form-control" onChange={(e) => setText(e.target.value)}  value={text} rows="4" cols="50" placeholder="Write Message..."></textarea>
                                </div>
                                <FormInputAlert alert={textAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Feature user about: </label>
                                    <FontAwesomeIcon onClick={() => setFeatured(!featured)} className={`icon-toggle ${featured ? 'active' : ''}`} icon={featured ? faToggleOn : faToggleOff} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-button">
                        { 
                            button ? (
                                <button type="button">PLEASE WAIT...</button>
                            ) : (
                                <button onClick={() => UpdateAbout()} type="button">UPDATE ABOUT</button>
                            )
                        }
                        
                    </div>
               </div>
            </div>
        </div>
    )
}


export default About