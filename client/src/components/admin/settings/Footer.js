import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Validate } from '../../../helper/Validation'
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'







const Footer = ({alertNotification, preloader}) => {
    let token = Cookies.get('Eloquent_token')
    const FetchFooterRef = useRef(null)
    const [button, setButton] = useState('')
    const [appName, setAppName] = useState('')
    const [emailTitle, setEmailTitle] = useState('')
    const [email, setEmail] = useState('')
    const [phoneTitle, setPhoneTitle] = useState('')
    const [phoneOne, setPhoneOne] = useState('')
    const [phoneTwo, setPhoneTwo] = useState('')
    const [addressTitle, setAddressTitle] = useState('')
    const [address, setAddress] = useState('')
    const [postCode, setPostCode] = useState('')
    const [town, setTown] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [allRights, setAllRights] = useState('')


    const [appNameAlert, setAppNameAlert] = useState('')
    const [emailTitleAlert, setEmailTitleAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [phoneTitleAlert, setPhoneTitleAlert] = useState('')
    const [phoneOneAlert, setPhoneOneAlert] = useState('')
    const [phoneTwoAlert, setPhoneTwoAlert] = useState('')
    const [addressTitleAlert, setAddressTitleAlert] = useState('')
    const [addressAlert, setAddressAlert] = useState('')
    const [postCodeAlert, setPostCodeAlert] = useState('')
    const [townAlert, setTownAlert] = useState('')
    const [stateAlert, setStateAlert] = useState('')
    const [countryAlert, setCountryAlert] = useState('')
    const [allRightsAlert, setAllRightsAlert] = useState('')



    const UpdateFooter = () => {
        initErrorAlert() //initialize form input error alert
        if(token){
            const content = {
                appName: appName, token: token, emailTitle: emailTitle,
                email: email, address: address,  addressTitle: addressTitle,
                town: town, postCode: postCode,  state: state,  country: country, 
                phoneOne: phoneOne,  phoneTwo: phoneTwo, phoneTitle: phoneTitle, allRights: allRights
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            preloader(true, 'Please wait...')
            setButton(true)
            Axios.post(url('/api/admin/update-app-settings'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
    
                    alertNotification('success', 'Portfolio updated successfully!')
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


    //  initialize form input error
    const initErrorAlert = () => {
        setAppNameAlert('')
        setEmailTitleAlert('')
        setEmailAlert('')
        setPhoneTitleAlert('')
        setPhoneOneAlert('')
        setPhoneTwoAlert('')
        setAddressTitleAlert('')
        setAddressAlert('')
        setPostCodeAlert('')
        setTownAlert('')
        setStateAlert('')
        setCountryAlert('')
        setAllRightsAlert('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setAppNameAlert(error.appName)
        setEmailTitleAlert(error.emailTitle)
        setEmailAlert(error.email)
        setPhoneTitleAlert(error.phoneTitle)
        setPhoneOneAlert(error.phoneOne)
        setPhoneTwoAlert(error.phoneTwo)
        setAddressTitleAlert(error.addressTitle)
        setAddressAlert(error.address)
        setPostCodeAlert(error.postcode)
        setTownAlert(error.town)
        setStateAlert(error.state)
        setCountryAlert(error.country)
        setAllRightsAlert(error.allRights)
    }

    
 // validate input
 const validate_input = (input) => {
    const content = [
        { field: 'app name', input: input.appName,  maxLength: 50,  minLength: 3, required: true },
        { field: 'email', input: input.email,  email: true, required: true },
        { field: 'email title', input: input.emailTitle,  maxLength: 50,  minLength: 3, required: true },
        { field: 'phone title', input: input.phoneTitle,  maxLength: 50,  minLength: 3, required: true },
        { field: 'phone one', input: input.phoneOne, required: true, phone: true},
        { field: 'phone two', input: input.phoneTwo, phone: true },
        { field: 'address title', input: input.addressTitle,  maxLength: 50,  minLength: 3, required: true },
        { field: 'address', input: input.address,  maxLength: 100,  minLength: 3, required: true },
        { field: 'postcode', input: input.postCode,  maxLength: 30,  minLength: 3, required: true },
        { field: 'town', input: input.town,  maxLength: 100,  minLength: 3, required: true },
        { field: 'state', input: input.state,  maxLength: 100,  minLength: 3},
        { field: 'country', input: input.country,  maxLength: 50,  minLength: 3, required: true },
        { field: 'all rights', input: input.allRights,  maxLength: 50,  minLength: 3, required: true },
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'app name'){ setAppNameAlert(validate.error)}
            if(validate.field === 'email'){ setEmailAlert(validate.error)}
            if(validate.field === 'email title'){ setEmailTitleAlert(validate.error)}
            if(validate.field === 'address title'){ setAddressTitleAlert(validate.error)}
            if(validate.field === 'address'){ setAddressAlert(validate.error)}
            if(validate.field === 'postcode'){ setPostCodeAlert(validate.error)}
            if(validate.field === 'town'){ setTownAlert(validate.error)}
            if(validate.field === 'state'){ setStateAlert(validate.error)}
            if(validate.field === 'country'){ setCountryAlert(validate.error)}
            if(validate.field === 'phone title'){ setPhoneTitleAlert(validate.error)}
            if(validate.field === 'phone one'){ setPhoneOneAlert(validate.error)}
            if(validate.field === 'phone two'){ setPhoneTwoAlert(validate.error)}
            if(validate.field === 'all rights'){ setAllRightsAlert(validate.error)}
            return false
        })
        return false
    }else{
        return 'success'
    }
}

// fetch footer data
const FetchFooter = () => {
    if(token){
        preloader(true, 'Please wait...')
        Axios.get(url(`/api/admin/fetch-user-footer-settings/${token}`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                const settings = data.settings
                setAppName(settings.app_name)
                setEmailTitle(settings.email_title)
                setEmail(settings.email)
                setPhoneTitle(settings.phone_title)
                setPhoneOne(settings.phone_one)
                setPhoneTwo(settings.phone_two)
                setAddressTitle(settings.address_title)
                setAddress(settings.address)
                setPostCode(settings.postcode)
                setTown(settings.town)
                setState(settings.state)
                setCountry(settings.country)
                setAllRights(settings.all_rights)
            }
            preloader(false)
        }).catch(error => {
            preloader(false)
            console.log(error)
        })
    }
}

FetchFooterRef.current = FetchFooter

useEffect(() => {
    window.scrollTo(0, 0) // page scroll to top
    FetchFooterRef.current()
}, [])

  return (
    <div className="dashboard-form-container">
      <TitleHeader/>
            <div className="content-form">
               <div className="form">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>App Name:</label>
                                <input type="text" onChange={(e) => setAppName(e.target.value)} value={appName} className="form-control" placeholder="App name"/>
                                <FormInputAlert alert={appNameAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Email Title:</label>
                                <input type="text" onChange={(e) => setEmailTitle(e.target.value)} value={emailTitle} className="form-control" placeholder="Email title"/>
                                <FormInputAlert alert={emailTitleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter email"/>
                                <FormInputAlert alert={emailAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Phone Title:</label>
                                <input type="text" onChange={(e) => setPhoneTitle(e.target.value)} value={phoneTitle} className="form-control" placeholder="Phone title"/>
                                <FormInputAlert alert={phoneTitleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Phone One:</label>
                                <input type="text" onChange={(e) => setPhoneOne(e.target.value)} value={phoneOne} className="form-control" placeholder="Phone one"/>
                                <FormInputAlert alert={phoneOneAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Phone Two:</label>
                                <input type="text" onChange={(e) => setPhoneTwo(e.target.value)} value={phoneTwo} className="form-control" placeholder="Phone two"/>
                                <FormInputAlert alert={phoneTwoAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Adress Title:</label>
                                <input type="text" onChange={(e) => setAddressTitle(e.target.value)} value={addressTitle} className="form-control" placeholder="Address title"/>
                                <FormInputAlert alert={addressTitleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                            <label>Address:</label>
                            <div className="form-group">
                                <textarea className="form-control" onChange={(e) => setAddress(e.target.value)}  value={address} rows="4" cols="50" placeholder="Enter address..."></textarea>
                                <FormInputAlert alert={addressAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Town:</label>
                                <input type="text" onChange={(e) => setTown(e.target.value)} value={town} className="form-control" placeholder="Enter town"/>
                                <FormInputAlert alert={townAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Postcode:</label>
                                <input type="text" onChange={(e) => setPostCode(e.target.value)} value={postCode} className="form-control" placeholder="Enter Postcode"/>
                                <FormInputAlert alert={postCodeAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                            <div className="form-group">
                                <label>State:</label>
                                <input type="text" onChange={(e) => setState(e.target.value)} value={state} className="form-control" placeholder="Enter State"/>
                                <FormInputAlert alert={stateAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>Country:</label>
                                <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} className="form-control" placeholder="Enter Country"/>
                                <FormInputAlert alert={countryAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                <label>All Rights:</label>
                                <input type="text" onChange={(e) => setAllRights(e.target.value)} value={allRights} className="form-control" placeholder="Enter Allrights"/>
                                <FormInputAlert alert={allRightsAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => UpdateFooter()} type="button">UPDATE FOOTER</button>
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

export default Footer



const TitleHeader = () => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>FOOTER</h3>
            </div>
        </div>
    )
}