import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEye,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'









const ContactHeader = ({ image, setImage, preloader, alertNotification }) => {
    return (
      <div className="dashboard-banner-container">
        <TitleHeader/>
        <ContactContent image={image} setImage={setImage} preloader={preloader} alertNotification={alertNotification}/>
      </div>
    )
  }
  
  export default ContactHeader




  const TitleHeader = () => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>CONTACT ME</h3>
            </div>
            <div className="right-button">
                <NavLink to="/dashboard/contacts">
                    <FontAwesomeIcon className="icon" icon={faEye} />View Contacts
                </NavLink>
            </div>
        </div>
    )
  }




const ContactContent = ({preloader, alertNotification, image, setImage }) => {
    const FetchContactHeaderRef = useRef()
    let token = Cookies.get('Eloquent_token')


    const [title, setTitle] = useState('')
    const [header, setHeader] = useState('')
    const [span, setSpan] = useState('')
    const [text, setText] = useState('')
    const [formText, setFormText] = useState('')
    const [reviewCount, setReviewCount] = useState('')
    const [projectCount, setProjectCount] = useState('')
    const [featured, setFeatured] = useState(false)
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [headerAlert, setHeaderAlert] = useState('')
    const [spanAlert, setSpanAlert] = useState('')
    const [textAlert, setTextAlert] = useState('')
    const [formTextAlert, setFormTextAlert] = useState('')

    

    const UpdateContactHeader = () => {
        if(token){
            initErrorAlert() //initialize form input error alert
            const content = {
                text: text,
                span: span,
                title: title,
                token: token,
                header: header,
                formText: formText,
                featured: featured,
                reviewCount: reviewCount,
                projectCount: projectCount
            }
            const validate = validate_input(content)
            if(validate === false) return 
        
            setButton(true)
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/update-contact-header'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    setTitle(data.contactHeader.title)
                    setHeader(data.contactHeader.header)
                    setSpan(data.contactHeader.span)
                    setText(data.contactHeader.text)
                    setFormText(data.contactHeader.form_text)
                    setProjectCount(data.contactHeader.project_count)
                    setReviewCount(data.contactHeader.review_count)
                    setFeatured(data.contactHeader.is_featured)
                    alertNotification('success', 'Contact Header Updated sucessfully!')
                }
                preloader(false)
                return setButton(false)
            }).catch(error => {
                setButton(false)
                preloader(false)
                console.log(error)
                alertNotification('error', 'Something went wrong!')
            })
        }
    }


    // validate input
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
        if(input.formText.length === 0){
            failed = true
            setFormTextAlert(`*Form Text field is required`)
        } else if(input.formText.length < 3){
            failed = true
            setFormTextAlert(`*Must be minimum of 3 characters`)
        }else if(input.formText.length > 1000){
            failed = true
            setFormTextAlert(`*Must be maximum of 1000 characters`)
        }
        if(input.header.length === 0){
            failed = true
            setHeaderAlert(`*Header field is required`)
        } else if(input.header.length < 3){
            failed = true
            setHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(input.header.length > 50){
            failed = true
            setHeaderAlert(`*Must be maximum of 50 characters`)
        }
        if(input.span.length === 0){
            failed = true
            setSpanAlert(`*Span field is required`)
        } else if(input.span.length < 3){
            failed = true
            setSpanAlert(`*Must be minimum of 3 characters`)
        }else if(input.span.length > 50){
            failed = true
            setSpanAlert(`*Must be maximum of 50 characters`)
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


    const inputErrorForBackend = (error) => {
        setSpanAlert(error.span)
        setTextAlert(error.text)
        setTitleAlert(error.title)
        setHeaderAlert(error.header)
        setFormTextAlert(error.formText)
    }

    const initErrorAlert = () => {
        setTitleAlert('')
        setHeaderAlert('')
        setSpanAlert('')
        setTextAlert('')
        setFormTextAlert('')
    }

    // fetch service header
    const FetchContactHeader = () => {
        preloader(true, 'Loading, please wait...')
        if(token){
            Axios.get(url(`/api/admin/fetch-user-contact-header/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    setTitle(data.contactHeader.title)
                    setHeader(data.contactHeader.header)
                    setSpan(data.contactHeader.span)
                    setText(data.contactHeader.text)
                    setFormText(data.contactHeader.form_text)
                    setProjectCount(data.contactHeader.project_count)
                    setReviewCount(data.contactHeader.review_count)
                    setFeatured(data.contactHeader.is_featured)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }

    FetchContactHeaderRef.current = FetchContactHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchContactHeaderRef.current()
    }, [])

    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="form-group">
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Form Title:</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter Title"/>
                                    <FormInputAlert alert={titleAlert}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label>Form Text:</label>
                                <div className="form-group">
                                    <textarea className="form-control" onChange={(e) => setFormText(e.target.value)}  value={formText} rows="4" cols="50" placeholder="Write Message..."></textarea>
                                </div>
                                <FormInputAlert alert={formTextAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Span:</label>
                                <input type="text" onChange={(e) => setSpan(e.target.value)} value={span} className="form-control span" placeholder="Enter Span"/>
                                <FormInputAlert alert={spanAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Header:</label>
                                <input type="text" onChange={(e) => setHeader(e.target.value)} value={header} className="form-control" placeholder="Enter Header"/>
                                <FormInputAlert alert={headerAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <label>Text:</label>
                                <div className="form-group">
                                    <textarea className="form-control" onChange={(e) => setText(e.target.value)}  value={text} rows="4" cols="50" placeholder="Write Message..."></textarea>
                                </div>
                                <FormInputAlert alert={textAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Porject Count:</label>
                                <input type="number" min="0" onChange={(e) => setProjectCount(e.target.value)} value={projectCount} className="form-control" placeholder="Project Count"/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Review Count:</label>
                                <input type="number" min="0" onChange={(e) => setReviewCount(e.target.value)} value={reviewCount} className="form-control" placeholder="Review count"/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Feature Header: </label>
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
                                <button onClick={() => UpdateContactHeader()} type="button">UPDATE CONTACT HEADER</button>
                            )
                        }  
                    </div>
               </div>
            </div>
        </div>
    )
}

