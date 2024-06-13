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
  return (
    <div className="footer-container">
        <div className="inner-footer">
            <div className="links">
                <Row className="show-grid">
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><AddressContact/></Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><PhoneContact/></Col>
                    <Col xs={12} sm={12} md={6} lg={4} xl={4}><EmailContact/></Col>
                </Row>
            </div>
        </div>
        <BottomContent/>
    </div>
  )
}

export default Footer






const BottomContent = () => {
    return (
        <div className="bottom-link">
            <div className="inner-bottom-link">
                <div className="left">
                    &copy; Eloquent 2023 | All Rights Reserved
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
                    &copy; Eloquent 2023 | All Rights Reserved
                </div>
            </div>
        </div>
    )
}





const AddressContact = () => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                        <h3>Address</h3>
                    </li>
                    <li className="item">126 Borough Road,</li>
                    <li className="item">Middlesbrough, TS1 2ES</li>
                </ul>
            </div>
        </div>
    )
}


const PhoneContact = () => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faPhone} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                        <h3>Lets Talk Us</h3>
                    </li>
                    <li className="item">+447926555272</li>
                    <li className="item">+2348022700830</li>
                </ul>
            </div>
        </div>
    )
}


const EmailContact = () => {
    return (
        <div className="content-item">
            <div className="img">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </div>
            <div className="content">
                <ul>
                    <li className="title">
                        <h3>Send Us Email</h3>
                    </li>
                    <li className="item">
                        <NavLink to="/">anonyecharles@gmail.com</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}













