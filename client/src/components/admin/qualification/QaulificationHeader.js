import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Validate } from '../../../helper/Validation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'











const QualificationHeader = ({preloader, alertNotification }) => {
    const navigate = useNavigate()
    const qualificationHeaderRef = useRef(null)
    const [title, setTitle] = useState('')
    const [featured, setFeatured] = useState(false)
    const [firstHeader, setFirstHeader] = useState('')
    const [secondHeader, setSecondHeader] = useState('')
    const [button, setButton] = useState(false)
    let token = Cookies.get('Eloquent_token')

    const [titleAlert, setTitleAlert] = useState('')
    const [firstHeaderAlert, setFirstHeaderAlert] = useState('')
    const [secondHeaderAlert, setSecondHeaderAlert] = useState('')



    const UpdateSkillsHeader = () => {
        if(token){
            initErrorAlert() //initialize form input error alert
            const content = {
                title: title,
                token: token,
                featured: featured,
                firstHeader: firstHeader,
                secondHeader: secondHeader,
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
        
            setButton(true)
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/update-qualification-header'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    const header = data.qualificationHeader
                    alertNotification('success', 'Updated sucessfully!')
                    setTitle(header.title)
                    setFirstHeader(header.first_header)
                    setSecondHeader(header.second_header)
                    setFeatured(header.is_featured)
                }else if (data.status === 'not-login'){
                    setButton(false)
                    preloader(false)
                    navigate('/dashboard/login')
                }else if(data.status === 'catch-error'){
                    console.log(data.catchError)
                }
                preloader(false)
                setButton(false)
            }).catch(error => {
                setButton(false)
                preloader(false)
                console.log(error)
            })
        }
    }


        // validate input
    const validate_input = (input) => {
        const content = [
            { field: 'title', input: input.title, maxLength: 50, minLength: 3, required: true },
            { field: 'first header', input: input.firstHeader, maxLength: 100, minLength: 3, required: true },
            { field: 'second header', input: input.secondHeader, maxLength: 100, minLength: 3},
        ]
        const validation = Validate(content)
        if(validation !== 'success'){
            validation.map((validate) => {
                if(validate.field === 'title'){ setTitleAlert(validate.error)}
                if(validate.field === 'first header'){ setFirstHeaderAlert(validate.error)}
                if(validate.field === 'second header'){ setSecondHeaderAlert(validate.error)}
                return false
            })
            return false
        }else{
            return 'success'
        }
    }


    const inputErrorForBackend = (error) => {
        setTitleAlert(error.title)
        setFirstHeaderAlert(error.firstHeader)
        setSecondHeaderAlert(error.secondHeader)
    }

    const initErrorAlert = () => {
        setTitleAlert('')
        setFirstHeaderAlert('')
        setSecondHeaderAlert('')
    }

    // fetch service header
    const FetchQualificationHeader = () => {
        if(token){
            preloader(true, 'Loading, please wait...')
            Axios.get(url(`/api/admin/fetch-qualification-header/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    let content = data.qualificationHeader
                    setTitle(content.title)
                    setFirstHeader(content.first_header)
                    setSecondHeader(content.second_header)
                    setFeatured(content.is_featured)
                }else if (data.status === 'not-login'){
                    return navigate('/dashboard/login')
                }else if(data.status === 'error'){
                    console.log(data.error)
                }else if(data.status === 'catch-error'){
                    console.log(data.catchError)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }

    qualificationHeaderRef.current = FetchQualificationHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        qualificationHeaderRef.current()
    }, [])

    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>QUALIFICATION HEADER</h3>
                    </div>
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
                                <label>First Header:</label>
                                <input type="text" onChange={(e) => setFirstHeader(e.target.value)} value={firstHeader} className="form-control" placeholder="Enter First Header"/>
                                <FormInputAlert alert={firstHeaderAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Second Header:</label>
                                <input type="text" onChange={(e) => setSecondHeader(e.target.value)} value={secondHeader} className="form-control" placeholder="Enter Second Header"/>
                                <FormInputAlert alert={secondHeaderAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Feature Qualification: </label>
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
                                <button onClick={() => UpdateSkillsHeader()} type="button">UPDATE SKILLS HEADER</button>
                            )
                        }
                        
                    </div>
               </div>
            </div>
        </div>
    )
}


export default QualificationHeader