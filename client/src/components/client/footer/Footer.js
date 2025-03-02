import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPhone,
  faEnvelope,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'







const Footer = () => {
    const footerItem = {
        address_title: "Address",
        address: "126 Borough Road,",
        town: "Middlesbrough",
        postcode: "TS1 2ES",
        contact_title: "Talk To Us",
        phone_one: "+447926555272",
        phone_two: "+2348022700830",
        email_title: "Send Us Email",
        email: "anonyecharles@gmail.com",
        since: "Eloquent 2023 | All Rights Reserved",
    }



  return (
    <div className="footer-container">
        <div className="inner-footer">
            <div className="links">
                <Row className="show-grid">
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><AddressContact footerItem={footerItem}/></Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><PhoneContact footerItem={footerItem}/></Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><EmailContact footerItem={footerItem}/></Col>
                </Row>
            </div>
        </div>
        <BottomContent footerItem={footerItem}/>
    </div>
  )
}

export default Footer






const BottomContent = ({footerItem}) => {
    return (
        <div className="bottom-link">
            <div className="inner-bottom-link">
                <div className="left">
                    &copy;  {footerItem.since}
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
                   &copy; {footerItem.since}
                </div>
            </div>
        </div>
    )
}





const AddressContact = ({footerItem}) => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                        { footerItem.address_title ? (<h3>{footerItem.address_title}</h3>) : null }
                    </li>
                    { footerItem.address ? (<li className="item">{footerItem.address}</li>) : null }
                    <li className="item">{`${footerItem.town} ${footerItem.postcode}`}</li>
                </ul>
            </div>
        </div>
    )
}


const PhoneContact = ({footerItem}) => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faPhone} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                    { footerItem.contact_title ? (<h3>{footerItem.contact_title}</h3>) : null }
                    </li>
                    { footerItem.phone_one ? (<li className="item">{footerItem.phone_one}</li>) : null }
                    { footerItem.phone_two ? (<li className="item">{footerItem.phone_two}</li>) : null }
                </ul>
            </div>
        </div>
    )
}


const EmailContact = ({footerItem}) => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </div>
            <div className="content">
                <ul>
                    
                    { footerItem.email_title ? (
                        <li className="title">
                            <h3>{footerItem.email_title}</h3>
                        </li>) : null }
                        
                    { footerItem.email ? (
                            <li className="item">
                                <NavLink to="/">{footerItem.email}</NavLink>
                            </li>
                    ) : null }
                </ul>
            </div>
        </div>
    )
}













