import Axios from 'axios'
import JoditEditor from 'jodit-react'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url, userImage} from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeBanners } from '../../redux/admin/BannerSlice'
import Cookies from 'js-cookie'








const Banner = ({ user, preloader, alertNotification }) => {
    // redux store
    const dispatch = useDispatch()
    const homeBanners = useSelector(state => state.homeBanners.homeBanners)
  
    const imageRef = useRef()
    const descriptionRef = useRef(null)
    const homeBannerRef = useRef()

    const [formState, setFormState] = useState(false)
    const [name, setName] = useState('')
    const [cvLink, setCvLink] = useState('')
    const [image, setImage] = useState('')
    const [firstHeader, setFirstHeader] = useState('')
    const [secondHeader, setSecondHeader] = useState('')
    const [spanHeader, setSpanHeader] = useState('')
    const [description, setDescription] = useState('')
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [cvLinkAlert, setCvLinkAlert] = useState('')
    const [firstHeaderAlert, setFirstHeaderAlert] = useState('')
    const [secondHeaderAlert, setSecondHeaderAlert] = useState('')
    const [spanHeaderAlert, setSpanHeaderAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    // toggle add banner for
    const toggleForm = (state) => {
        setFormState(state)
        initFormInput()
    }

    // add new banner
    const addNewBanner = () => {
        initErrorAlert() //initialize form input error alert
        const validate = validate_input(name, firstHeader, secondHeader, spanHeader, cvLink, description)
        if(validate === false) return 
        const content = {
            name: name,
            cvLink: cvLink,
            user_id: user._id,
            firstHeader: firstHeader,
            secondHeader: secondHeader,
            spanHeader: spanHeader,
            description: description
        }
        
        setButton(true)
        preloader(true, 'Please wait...')
        Axios.post(url('/api/admin/add-home-client-banner'), content).then((response) => {
            const data = response.data
            if(data.status === 'input-error'){
                inputErrorForBackend(data.validationError)
            }else if(data.status === 'error'){
                alertNotification('error', data.message)
            }else if(data.status === 'ok'){
                alertNotification('success', 'Updated sucessfully!')
                dispatch(fetchHomeBanners(data.newBanner))
            }
            preloader(false)
            return setButton(false)
        }).catch(error => {
            setButton(false)
            preloader(false)
            console.log(error)
        })
    }

    const getHomeBanners = () => {
        let token = Cookies.get('Eloquent_token')
        if(token){
            preloader(true, 'Loading, please wait...')
            Axios.get(url(`/api/admin/fetch-home-banners/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    let banner = data.content
                    setName(banner.name)
                    setImage(banner.image)
                    setCvLink(banner.cv_link)
                    setFirstHeader(banner.first_header)
                    setSecondHeader(banner.second_header)
                    setSpanHeader(banner.span_header)
                    setDescription(banner.description)
                    dispatch(fetchHomeBanners(banner))
                    preloader(false)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    homeBannerRef.current = getHomeBanners

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        homeBannerRef.current()
    }, [])


    const initErrorAlert = () => {
        setNameAlert('')
        setCvLinkAlert('')
        setFirstHeaderAlert('')
        setSecondHeaderAlert('')
        setSpanHeaderAlert('')
        setDescriptionAlert('')
    }
    const initFormInput = () => {
        setName('')
        setCvLink('')
        setFirstHeader('')
        setSecondHeader('')
        setDescription('')
    }
    
    const validate_input = (name='', firstHeader='', secondHeader='', spanHeader='', cvLink= '', description='') => {
        let failed = false;
        initErrorAlert()

        if(name.length === 0){
            failed = true
            setNameAlert(`*Name field is required`)
        } else if(name.length < 3){
            failed = true
            setNameAlert(`*Must be minimum of 3 characters`)
        }else if(name.length > 100){
            failed = true
            setNameAlert(`*Must be maximum of 100 characters`)
        }
        if(cvLink.length === 0){
            failed = true
            setCvLinkAlert(`*CV Link field is required`)
        } else if(cvLink.length < 3){
            failed = true
            setCvLinkAlert(`*Must be minimum of 3 characters`)
        }else if(cvLink.length > 100){
            failed = true
            setCvLinkAlert(`*Must be maximum of 100 characters`)
        }
        if(firstHeader.length === 0){
            failed = true
            setFirstHeaderAlert(`*First Header field is required`)
        } else if(firstHeader.length < 3){
            failed = true
            setFirstHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(firstHeader.length > 100){
            failed = true
            setFirstHeaderAlert(`*Must be maximum of 100 characters`)
        }
        if(spanHeader.length === 0){
            failed = true
            setSpanHeaderAlert(`*Span header field is required`)
        }else if(spanHeader.length > 100){
            failed = true
            setSpanHeaderAlert(`*Must be maximum of 100 characters`)
        }
        if(secondHeader.length === 0){
            failed = true
            setSecondHeaderAlert(`*Second Header field is required`)
        } else if(secondHeader.length < 3){
            failed = true
            setSecondHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(secondHeader.length > 100){
            failed = true
            setSecondHeaderAlert(`*Must be maximum of 100 characters`)
        }
        if(description.length === 0){
            failed = true
            setDescriptionAlert(`*Description field is required`)
        } else if(description.length < 20){
            failed = true
            setDescriptionAlert(`*Must be minimum of 20 characters`)
        }else if(description.length > 1000){
            failed = true
            setDescriptionAlert(`*Must be maximum of 1000 characters`)
        }
        if(failed === true){
            return false
        }else{
            return true
        }
    }



    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setCvLinkAlert(error.cvLink)
        setFirstHeaderAlert(error.firstHeader)
        setSecondHeaderAlert(error.secondHeader)
        setSpanHeaderAlert(error.spanHeader)
        setDescriptionAlert(error.description)
    }

    // upload banner image
    const toggleImageInput = (event) => {
        let token = Cookies.get('Eloquent_token')
        if(token){
            // preloader(true, 'Uploading image, please wait...')
            if(event.target.files && event.target.files.length > 0){
                // upload image here
                const formData = new FormData()
                formData.append('token', token)
                formData.append('image', event.target.files[0])
                Axios.post(url('/api/admin/upload-home-banner-image'), formData).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        setImage(data.imageName)
                        clearFileInput()
                        preloader(false)
                        alertNotification('success', 'Image uploaded sucessfully!')
                    }
                }).catch(error => {
                    console.log(error)
                    alertNotification('error', 'Something went wrong!')
                })
            }
        }
    }

    const clearFileInput = () => {
        return imageRef.current.value = '';
    }
    const uploadBannerImage = () => {
        return imageRef.current.click()
    }


    return (
        <div className="dashboard-banner-container">
            <TitleHeader/>
            <BannerImage image={image} uploadBannerImage={uploadBannerImage} toggleImageInput={toggleImageInput} imageRef={imageRef}/>
            <ContentBanner homeBanners={homeBanners} setSpanHeader={setSpanHeader} spanHeader={spanHeader} spanHeaderAlert={spanHeaderAlert}
                            formState={formState} setName={setName} name={name}  button={button} cvLinkAlert={cvLinkAlert}
                            setDescription={setDescription} description={description} descriptionRef={descriptionRef} 
                            firstHeader={firstHeader} setFirstHeader={setFirstHeader} toggleForm={toggleForm} 
                            secondHeader={secondHeader} setSecondHeader={setSecondHeader} addNewBanner={addNewBanner}
                            nameAlert={nameAlert} descriptionAlert={descriptionAlert} firstHeaderAlert={firstHeaderAlert}
                            secondHeaderAlert={secondHeaderAlert} cvLink={cvLink} setCvLink={setCvLink}/> 
        </div>
    )
}

export default Banner




const TitleHeader = () => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>HOME BANNER</h3>
            </div>
        </div>
    )
}







const ContentBanner = ({
    descriptionRef, name, nameAlert, setName, firstHeader, setFirstHeader, 
    secondHeader, setSecondHeader, button, addNewBanner, cvLinkAlert,
    description, setDescription, cvLink, setCvLink, spanHeader,
    firstHeaderAlert, secondHeaderAlert, descriptionAlert, setSpanHeader, spanHeaderAlert
    }) => {
    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="form-group">
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter Name"/>
                                    <FormInputAlert alert={nameAlert}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>CV Link:</label>
                                <input type="text" onChange={(e) => setCvLink(e.target.value)} value={cvLink} className="form-control" placeholder="Enter CV Link"/>
                                <FormInputAlert alert={cvLinkAlert}/>
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
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Span Header:</label>
                                <input type="text" onChange={(e) => setSpanHeader(e.target.value)} value={spanHeader} className="form-control span" placeholder="Enter Span Header"/>
                                <FormInputAlert alert={spanHeaderAlert}/>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <JoditEditor ref={descriptionRef} value={description} onChange={(description) => setDescription(description)}/>
                        <FormInputAlert alert={descriptionAlert}/>
                    </div>
                    <div className="form-button">
                        { 
                            button ? (
                                <button type="button">PLEASE WAIT...</button>
                            ) : (
                                <button onClick={() => addNewBanner()} type="button">UPDATE BANNER</button>
                            )
                        }
                    </div>
               </div>
            </div>
        </div>
    )
}






const BannerImage = ({ image, uploadBannerImage, toggleImageInput, imageRef}) => {
const user_image = image ? image : 'demo.jpg'

    return (
        <div className="banner-image-container">
            <div className="inner-banner-image">
                {
                    image.length ? (
                        <div className="image">
                            <FontAwesomeIcon onClick={() => uploadBannerImage()} className="icon edit" icon={faPen} />
                            <img src={userImage(user_image)} alt="banner"/>
                        </div>
                    ) : (
                        <div className="image-container">
                            <FontAwesomeIcon onClick={() => uploadBannerImage()} className="icon" icon={faCamera} />
                        </div>
                    )
                }
                <input ref={imageRef} type="file" onChange={toggleImageInput} className="filetype" />
            </div>
        </div>
    )
}