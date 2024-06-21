import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope,
  faBriefcase,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import HTMLReactParser from 'html-react-parser'






const GetInTouch = () => {

    const contactMe = {
        form_title: "Contact Me?",
        form_text: "For your car we will do everything advice design in us repairs and maintenance We are the some preferred",
        header: "and Innovation",
        span: "Design",
        text: "For your car we will do everything For your car we will do everything advice design in us repairs and maintenance We are the some preferred advice design in us repairs and maintenance We are the some preferred",
        project_count: "100",
        review_count: "400",
    }



  return (
    <div className="get-in-touch-container">
       <div className="inner-get-in-touch">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                    <ContentLeft contactMe={contactMe}/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                    <ContentRight contactMe={contactMe}/>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default GetInTouch





const ContentLeft = ({contactMe}) => {
    return (
        <div className="content-left">
            <div className="title-header">
                <h1>
                    { contactMe.span ? (<span>{contactMe.span} </span>) : null }
                    { contactMe.header ? (contactMe.header) : null }
                </h1>
            </div>
            <div className="body">
                {contactMe.text ? (HTMLReactParser(contactMe.text)) : null }
            </div>
            <div className="bottom-content">
            <Row className="show-grid">
                <BottomContent counter={contactMe.project_count} description={'Completed Projects'} icon={faBriefcase}/>
                <BottomContent counter={contactMe.review_count} description={'Client Reviews'} icon={faMagnifyingGlass}/>
            </Row>
            </div>
        </div>
    )
}





const BottomContent = ({counter, description, icon}) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="bottom-content-item">
                <ul>
                    <li>
                        <FontAwesomeIcon className="icon" icon={icon} />
                    </li>
                    <li className="counter">{counter + 'K+'}</li>
                    <li className="description">{description}</li>
                </ul>
            </div>
        </Col>
    )
}



const ContentRight = ({contactMe}) => {
    return (
        <div className="content-right">
            <div className="title-header">
                <h3>{contactMe.form_title}</h3>
                <div className="description">{contactMe.form_text ? (HTMLReactParser(contactMe.form_text)) : null }</div>
                <div className="contact-form">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter Name"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter Email"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter Phone"/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows="4" cols="50" placeholder="Write Message..."></textarea>
                    </div>
                    <div className="form-button">
                        <button type="button">
                            SUBMIT NOW
                            <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}