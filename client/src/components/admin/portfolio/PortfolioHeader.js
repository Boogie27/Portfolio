import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import { Validate } from '../../../helper/Validation'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'













const PortfolioHeader = ({preloader, alertNotification }) => {
    const navigate = useNavigate()
    const fetchPortfolioHeaderRef = useRef(null)
    const [title, setTitle] = useState('')
    const [firstHeader, setFirstHeader] = useState('')
    const [featured, setFeatured] = useState(false)
    const [secondHeader, setSecondHeader] = useState('')
    const [button, setButton] = useState(false)
    let token = Cookies.get('Eloquent_token')

    const [titleAlert, setTitleAlert] = useState('')
    const [firstHeaderAlert, setFirstHeaderAlert] = useState('')
    const [secondHeaderAlert, setSecondHeaderAlert] = useState('')



    const UpdatePortifolioHeader = () => {
        if(token){
            initErrorAlert() //initialize form input error alert
            const content = {
                title: title,
                token: token,
                featured: featured,
                firstHeader: firstHeader,
                secondHeader: secondHeader
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            setButton(true)
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/update-portfolio-header'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    alertNotification('success', 'Portifolio Header Updated sucessfully!')
                    setTitle(data.portfolioHeader.title)
                    setFirstHeader(data.portfolioHeader.first_header)
                    setSecondHeader(data.portfolioHeader.second_header)
                    setFeatured(data.portfolioHeader.is_featured)
                }else if (data.status === 'not-login'){
                    return navigate('/dashboard/login')
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
        const content = [
            {
                field: 'title',
                input: input.title,
                maxLength: 50,
                minLength: 3,
                required: true,
            },
            {
                field: 'first-header',
                input: input.firstHeader,
                maxLength: 100,
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
                if(validate.field === 'first-header'){
                    setFirstHeaderAlert(validate.error)
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
        setFirstHeaderAlert(error.firstHeader)
        setSecondHeaderAlert(error.secondHeader)
    }

    const initErrorAlert = () => {
        setTitleAlert('')
        setFirstHeaderAlert('')
        setSecondHeaderAlert('')
    }

    // fetch service header
    const FetchPortfolioHeader = () => {
        if(token){
            preloader(true, 'Loading, please wait...')
            Axios.get(url(`/api/admin/fetchportifolio-header/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    let content = data.portfolioHeader
                    setTitle(content.title)
                    setFirstHeader(content.first_header)
                    setSecondHeader(content.second_header)
                    setFeatured(data.portfolioHeader.is_featured)
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

    fetchPortfolioHeaderRef.current = FetchPortfolioHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        fetchPortfolioHeaderRef.current()
    }, [])

    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>PORTFOLIO HEADER</h3>
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
                                    <label>Feature Portfolio Header: </label>
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
                                <button onClick={() => UpdatePortifolioHeader()} type="button">UPDATE PORTIFOLIO HEADER</button>
                            )
                        }
                        
                    </div>
               </div>
            </div>
        </div>
    )
}


export default PortfolioHeader