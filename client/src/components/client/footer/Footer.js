import { useEffect, useRef } from 'react'
import Axios from 'axios'
import { url } from '../../../File'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPhone,
  faEnvelope,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppSettings } from '../../redux/admin/SettingsSlice'






const Footer = () => {
    // const settings = {
    //     address_title: "Address",
    //     address: "126 Borough Road,",
    //     town: "Middlesbrough",
    //     postcode: "TS1 2ES",
    //     contact_title: "Talk To Us",
    //     phone_one: "+447926555272",
    //     phone_two: "+2348022700830",
    //     email_title: "Send Us Email",
    //     email: "anonyecharles@gmail.com",
    //     all_rights: "Eloquent 2023 | All Rights Reserved",
    // }

    const dispatch = useDispatch()
    const settings = useSelector(state => state.settings.settings)
    const FetchSettingsRef = useRef(null)


    // fetch settings 
    const FetchSettings = () => {
        Axios.get(url(`/api/cleint/fetch-client-footer`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                dispatch(fetchAppSettings(data.settings))
            }else{
               console.log(data.message)
            }
        }).catch(error => {
            console.log(error)
        })
    }





    FetchSettingsRef.current = FetchSettings

    useEffect(() => {
        FetchSettingsRef.current()
    }, [])





  return (
    <div className="footer-container">
        <div className="inner-footer">
            <div className="links">
                <Row className="show-grid">
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><AddressContact settings={settings}/></Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><PhoneContact settings={settings}/></Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><EmailContact settings={settings}/></Col>
                </Row>
            </div>
        </div>
        <BottomContent settings={settings}/>
    </div>
  )
}

export default Footer






const BottomContent = ({settings}) => {
    return (
        <div className="bottom-link">
            <div className="inner-bottom-link">
                <div className="left">
                    &copy;  {settings.all_rights}
                </div>
                <div className="right">
                   <ul>
                        <li>
                            <NavLink to="/">Terms & Condition</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Privacy Policy</NavLink>
                        </li>
                   </ul>
                </div>
                <div className="left mobile">
                   &copy; {settings.all_rights}
                </div>
            </div>
        </div>
    )
}





const AddressContact = ({settings}) => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                        { settings.address_title ? (<h3>{settings.address_title}</h3>) : null }
                    </li>
                    { settings.address ? (<li className="item">{settings.address}</li>) : null }
                    <li className="item">{`${settings.town} ${settings.postcode}`}</li>
                </ul>
            </div>
        </div>
    )
}


const PhoneContact = ({settings}) => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faPhone} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                    { settings.phone_title ? (<h3>{settings.phone_title}</h3>) : null }
                    </li>
                    { settings.phone_one ? (<li className="item">{settings.phone_one}</li>) : null }
                    { settings.phone_two ? (<li className="item">{settings.phone_two}</li>) : null }
                </ul>
            </div>
        </div>
    )
}


const EmailContact = ({settings}) => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </div>
            <div className="content">
                <ul>
                    
                    { settings.email_title ? (
                        <li className="title">
                            <h3>{settings.email_title}</h3>
                        </li>) : null }
                        
                    { settings.email ? (
                            <li className="item">
                                <NavLink to="/">{settings.email}</NavLink>
                            </li>
                    ) : null }
                </ul>
            </div>
        </div>
    )
}













