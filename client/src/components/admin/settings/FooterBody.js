import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { Validate } from '../../../helper/Validation'
import { useDispatch } from 'react-redux'
import { UpdateAppSettings } from '../../redux/admin/SettingsSlice'









const Footer = ({ preloader, alertNotification }) => {
    // react hooks
    const dispatch = useDispatch()
    
    const FetchSettingsRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [appName, setAppName] = useState('')
    const [emailTitle, setEmailTitle] = useState('')
    const [email, setEmail] = useState('')
    const [phoneTitle, setPhoneTitle] = useState('')
    const [phoneOne, setPhoneOne] = useState('')
    const [phoneTwo, setPhoneTwo] = useState('')
    const [addressTitle, setAddressTitle] = useState('')
    const [address, setAddress] = useState('')
    const [town, setTown] = useState('')
    const [postcode, setPostcode] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [allrights, setAllrights] = useState('')


    const [button, setButton] = useState(false)


    const [appNameAlert, setAppNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [emailTitleAlert, setEmailTitleAlert] = useState('')
    const [phoneTitleAlert, setPhoneTitleAlert] = useState('')
    const [phoneOneAlert, setPhoneOneAlert] = useState('')
    const [phoneTwoAlert, setPhoneTwoAlert] = useState('')
    const [addressTitleAlert, setAddressTitleAlert] = useState('')
    const [addressAlert, setAddressAlert] = useState('')
    const [townAlert, setTownAlert] = useState('')
    const [postcodeAlert, setPostcodeAlert] = useState('')
    const [stateAlert, setStateAlert] = useState('')
    const [countryAlert, setCountryAlert] = useState('')
    const [allRightsAlert, setAllRightsAlert] = useState('')


    // update settings
    const EditAppSettings = () => {
        if(token){
            initErrorAlert() //initialize form input error alert 
            const content = {
                token: token,
                town: town,
                email: email,
                state: state,
                app_name: appName,
                email_title: emailTitle,
                address_title: addressTitle,
                address: address,
                postcode: postcode,
                country: country,
                all_rights: allrights,
                phone_title: phoneTitle,
                phone_one: phoneOne,
                phone_two: phoneTwo,
            }
            const validate = validate_input(content)
            if(validate === false) return
            setButton(true)
            Axios.post(url('/api/admin/update-app-settings'), content).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(UpdateAppSettings(data.updatedSettings))
                    alertNotification('success', 'App Settings Updated successfully!')
                }
                return setButton(false)
            }).catch(error => {
                setButton(false)
                console.log(error)
            })
        }
    }

    // validate input
 const validate_input = (input) => {
    const content = [
        { field: 'app name', input: input.app_name, maxLength: 50, minLength: 3, required: true },
        { field: 'email_title', input: input.email_title, maxLength: 50, minLength: 3, required: true },
        { field: 'email', input: input.email,  email: true, required: true },
        { field: 'address_title', input: input.address_title, maxLength: 50, minLength: 3,  required: true },
        { field: 'address', input: input.address, maxLength: 200, minLength: 3, required: true },
        { field: 'phone_title', input: input.phone_title, maxLength: 50, minLength: 3, required: true },
        { field: 'phone_one', input: input.phone_one, phone: true, required: true },
        { field: 'phone_two', input: input.phone_two, phone: true },
        { field: 'state', input: input.state, maxLength: 50, minLength: 3,  required: true },
        { field: 'postcode', input: input.postcode, maxLength: 10, minLength: 3,  required: true },
        { field: 'town', input: input.town, maxLength: 50, minLength: 3,  required: true },
        { field: 'country', input: input.country, maxLength: 50, minLength: 3,  required: true },
        { field: 'all_rights', input: input.all_rights, maxLength: 50, minLength: 3,  required: true },
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'app_name'){ setAppNameAlert(validate.error) }
            if(validate.field === 'email'){ setEmailAlert(validate.error) }
            if(validate.field === 'email_title'){ setEmailTitleAlert(validate.error) }
            if(validate.field === 'address'){ setAddressAlert(validate.error) }
            if(validate.field === 'address_title'){ setAddressTitleAlert(validate.error) }
            if(validate.field === 'phone_title'){ setPhoneTitleAlert(validate.error) }
            if(validate.field === 'phone_one'){ setPhoneOneAlert(validate.error) }
            if(validate.field === 'phone_two'){ setPhoneTwoAlert(validate.error) }
            if(validate.field === 'all_rights'){ setAllRightsAlert(validate.error) }
            if(validate.field === 'postcode'){ setPostcodeAlert(validate.error) }
            if(validate.field === 'town'){ setTownAlert(validate.error) }
            if(validate.field === 'state'){ setStateAlert(validate.error) }
            if(validate.field === 'country'){ setCountryAlert(validate.error) }
            return false
        })
        return false
    }else{
        return 'success'
    }
}


 //  initialize form input error
 const initErrorAlert = () => {
    setAppNameAlert('')
    setEmailAlert('')
    setEmailTitleAlert('')
    setPhoneTitleAlert('')
    setPhoneOneAlert('')
    setPhoneTwoAlert('')
    setAddressTitleAlert('')
    setAddressAlert('')
    setPostcodeAlert('')
    setStateAlert('')
    setCountryAlert('')
    setTownAlert('')
    setAllRightsAlert('')
}


// handle error from backend
const inputErrorForBackend = (error) => {
    setAppNameAlert(error.app_nameAlert)
    setEmailAlert(error.emailAlert)
    setEmailTitleAlert(error.email_titleAlert)
    setPhoneTitleAlert(error.phone_titleAlert)
    setPhoneOneAlert(error.phone_oneAlert)
    setPhoneTwoAlert(error.phone_twoAlert)
    setAddressTitleAlert(error.address_titleAlert)
    setAddressAlert(error.addressAlert)
    setPostcodeAlert(error.postcodeAlert)
    setStateAlert(error.stateAlert)
    setCountryAlert(error.countryAlert)
    setTownAlert(error.townAlert)
    setAllRightsAlert(error.all_rightsAlert)
}


    // fetch settings 
    const FetchSettings = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-user-footer-settings/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    const settings = data.settings
                    setAppName(settings.app_name)
                    setEmail(settings.email)
                    setEmailTitle(settings.email_title)
                    setPhoneTitle(settings.phone_title)
                    setPhoneOne(settings.phone_one)
                    setPhoneTwo(settings.phone_two)
                    setAddressTitle(settings.address_title)
                    setAddress(settings.address)
                    setPostcode(settings.postcode)
                    setState(settings.state)
                    setCountry(settings.country)
                    setTown(settings.town)
                    setAllrights(settings.all_rights)
                }else{
                    alertNotification('error', data.message)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }


    FetchSettingsRef.current = FetchSettings

    useEffect(() => {
        FetchSettingsRef.current()
    }, [])


    return (
        <div className="dashboard-banner-container">
            <div className="main-content-container">
                <div className="content-form">
                <div className="form">
                        <div className="form-group">
                            <Row className="show-grid">
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>App Name:</label>
                                        <input type="text" onChange={(e) => setAppName(e.target.value)} value={appName} className="form-control" placeholder="Enter App Name"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Email Title:</label>
                                        <input type="text" onChange={(e) => setEmailTitle(e.target.value)} value={emailTitle} className="form-control" placeholder="Enter Email Title"/>
                                        <FormInputAlert alert={emailTitleAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter Email"/>
                                        <FormInputAlert alert={emailAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Phone Title:</label>
                                        <input type="text" onChange={(e) => setPhoneTitle(e.target.value)} value={phoneTitle} className="form-control" placeholder="Enter Phone Title"/>
                                        <FormInputAlert alert={phoneTitleAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Phone one:</label>
                                        <input type="text" onChange={(e) => setPhoneOne(e.target.value)} value={phoneOne} className="form-control" placeholder="Enter Phone One"/>
                                        <FormInputAlert alert={phoneOneAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Phone Two:</label>
                                        <input type="text" onChange={(e) => setPhoneTwo(e.target.value)} value={phoneTwo} className="form-control" placeholder="Enter Phone Two"/>
                                        <FormInputAlert alert={phoneTwoAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Address Title:</label>
                                        <input type="text" onChange={(e) => setAddressTitle(e.target.value)} value={addressTitle} className="form-control" placeholder="Enter Address Ttitle"/>
                                        <FormInputAlert alert={addressTitleAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Address:</label>
                                        <textarea className="form-control" onChange={(e) => setAddress(e.target.value)}  value={address} rows="4" cols="50" placeholder="Write Address..."></textarea>
                                        <FormInputAlert alert={addressAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Town:</label>
                                        <input type="text" onChange={(e) => setTown(e.target.value)} value={town} className="form-control" placeholder="Enter Town"/>
                                        <FormInputAlert alert={townAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Postcode:</label>
                                        <input type="text" onChange={(e) => setPostcode(e.target.value)} value={postcode} className="form-control" placeholder="Enter Postcode"/>
                                        <FormInputAlert alert={postcodeAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>State:</label>
                                        <input type="text" onChange={(e) => setState(e.target.value)} value={state} className="form-control" placeholder="Enter State"/>
                                        <FormInputAlert alert={stateAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Country:</label>
                                        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} className="form-control" placeholder="Enter Country"/>
                                        <FormInputAlert alert={countryAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>All Rights:</label>
                                        <input type="text" onChange={(e) => setAllrights(e.target.value)} value={allrights} className="form-control" placeholder="Enter All Rights"/>
                                        <FormInputAlert alert={allRightsAlert}/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="form-button">
                            <button disabled={button} onClick={ () => EditAppSettings()}>
                                {button ? 'UPDATING FOOTER...' : 'UPDATE FOOTER'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer










