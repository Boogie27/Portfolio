import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { Validate } from '../../../helper/Validation'











const TestimonialHeader = ({preloader, alertNotification }) => {
    const navigate = useNavigate()
    const FetchTestimonialHeaderRef = useRef(null)
    const [title, setTitle] = useState('')
    const [header, setHeader] = useState('')
    const [featured, setFeatured] = useState(false)
    const [button, setButton] = useState(false)
    let token = Cookies.get('Eloquent_token')

    const [titleAlert, setTitleAlert] = useState('')
    const [headerAlert, setHeaderAlert] = useState('')



    const UpdateTestimonialHeader = () => {
        if(token){
            const content = {
                title: title,
                token: token,
                featured: featured,
                header: header,
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            setButton(true)
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/update-testimonial-header'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    initErrorAlert()
                    alertNotification('success', 'Testimonial updated sucessfully!')
                    setTitle(data.testimonial.title)
                    setHeader(data.testimonial.header)
                    setFeatured(data.testimonial.is_featured)
                }else if (data.status === 'not-login'){
                    return navigate('/dashboard/login')
                }else if(data.status === 'catch-error'){
                    console.log(data.catchError)
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
 const validate_input = (input) => {
    initErrorAlert()
    const content = [
        {
            field: 'title',
            input: input.title,
            maxLength: 50,
            minLength: 3,
            required: true,
        },
        {
            field: 'header',
            input: input.header,
            maxLength: 50,
            minLength: 3,
            required: true,
        }
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){
                setTitleAlert(validate.error)
            }
            if(validate.field === 'header'){
                setHeaderAlert(validate.error)
            }
            return false
        })
        return false
    }else{
        return 'success'
    }
}


    const inputErrorForBackend = (error) => {
        setTitleAlert(error.title)
        setHeaderAlert(error.header)
    }

    const initErrorAlert = () => {
        setTitleAlert('')
        setHeaderAlert('')
    }

    // fetch service header
    const FetchTestimonialHeader = () => {
        if(token){
            preloader(true, 'Loading, please wait...')
            Axios.get(url(`/api/admin/fetch-testimonial-header/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    let content = data.testimonialHeader
                    console.log(content)
                    setTitle(content.title)
                    setHeader(content.header)
                    setFeatured(content.is_featured)
                }else if (data.status === 'not-login'){
                    return navigate('/dashboard/login')
                }else if(data.status === 'error'){
                    console.log(data.error)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }

    FetchTestimonialHeaderRef.current = FetchTestimonialHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchTestimonialHeaderRef.current()
    }, [])

    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>TESTIMONIAL HEADER</h3>
                    </div>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter Title"/>
                                <FormInputAlert alert={titleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Header:</label>
                                <input type="text" onChange={(e) => setHeader(e.target.value)} value={header} className="form-control" placeholder="Enter Header"/>
                                <FormInputAlert alert={headerAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-group">
                                <label>Feature Testimonial: </label>
                                <FontAwesomeIcon onClick={() => setFeatured(!featured)} className={`icon-toggle ${featured ? 'active' : ''}`} icon={featured ? faToggleOn : faToggleOff} />
                            </div>
                        </Col>
                    </Row>
                    <div className="form-button">
                        { 
                            button ? (
                                <button type="button">PLEASE WAIT...</button>
                            ) : (
                                <button onClick={() => UpdateTestimonialHeader()} type="button">UPDATE TESTIMONIAL HEADER</button>
                            )
                        }
                        
                    </div>
               </div>
            </div>
        </div>
    )
}


export default TestimonialHeader