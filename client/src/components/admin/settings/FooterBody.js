import { useState } from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import HTMLReactParser from 'html-react-parser'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch } from 'react-redux'
// import { AddUserQualification } from '../../redux/admin/QualificationSlice'









const Footer = ({ preloader, alertNotification }) => {
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
    const [allright, setAllright] = useState('')


    const [button, setButton] = useState(false)


    const [appNameAlert, setAppNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [emailTitleAlert, setEmailTitleAlert] = useState('')
    const [phoneOneAlert, setPhoneOneAlert] = useState('')
    const [phoneTwoAlert, setPhoneTwoAlert] = useState('')
    const [addressTitleAlert, setAddressTitleAlert] = useState('')
    const [addressAlert, setAddressAlert] = useState('')
    const [townAlert, setTownAlert] = useState('')
    const [postcodeAlert, setPostcodeAlert] = useState('')
    const [stateAlert, setStateAlert] = useState('')
    const [charactersountryAlert, setCountryAlert] = useState('')
    const [allrightAlert, setAllrightAlert] = useState('')


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
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter Email"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Phone Title:</label>
                                        <input type="text" onChange={(e) => setPhoneTitle(e.target.value)} value={phoneTitle} className="form-control" placeholder="Enter Phone Title"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Phone one:</label>
                                        <input type="text" onChange={(e) => setPhoneOne(e.target.value)} value={phoneOne} className="form-control" placeholder="Enter Phone One"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Phone Two:</label>
                                        <input type="text" onChange={(e) => setPhoneTwo(e.target.value)} value={phoneTwo} className="form-control" placeholder="Enter Phone Two"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Address Title:</label>
                                        <input type="text" onChange={(e) => setAddressTitle(e.target.value)} value={addressTitle} className="form-control" placeholder="Enter Address Ttitle"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Address:</label>
                                        <textarea className="form-control" onChange={(e) => setAddress(e.target.value)}  value={address} rows="4" cols="50" placeholder="Write Address..."></textarea>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Town:</label>
                                        <input type="text" onChange={(e) => setTown(e.target.value)} value={town} className="form-control" placeholder="Enter Town"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Postcode:</label>
                                        <input type="text" onChange={(e) => setPostcode(e.target.value)} value={postcode} className="form-control" placeholder="Enter Postcode"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>State:</label>
                                        <input type="text" onChange={(e) => setState(e.target.value)} value={state} className="form-control" placeholder="Enter State"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>Country:</label>
                                        <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} className="form-control" placeholder="Enter Country"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <div className="form-group">
                                        <label>All Rights:</label>
                                        <input type="text" onChange={(e) => setAllright(e.target.value)} value={allright} className="form-control" placeholder="Enter All Rights"/>
                                        <FormInputAlert alert={appNameAlert}/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="form-button">
                            { 
                                button ? (
                                    <button type="button">PLEASE WAIT...</button>
                                ) : (
                                    <button  type="button">UPDATE FOOTER</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer










