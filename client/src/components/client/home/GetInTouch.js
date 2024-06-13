import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope,
  faBriefcase,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'







const GetInTouch = () => {
  return (
    <div className="get-in-touch-container">
       <div className="inner-get-in-touch">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                    <ContentLeft/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                    <ContentRight/>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default GetInTouch





const ContentLeft = () => {
    return (
        <div className="content-left">
            <div className="title-header">
                <h1><span>Design</span> and Innovation</h1>
            </div>
            <div className="body">
                Nemo design enim ipsam voluptatem quim 
                voluptas sit aspernatur aut odit auting fugit sed thisnquia 
                consequuntur magni dolores eos designer heresm qui ratione
            </div>
            <div className="bottom-content">
            <Row className="show-grid">
                <BottomContent counter={'100k+'} description={'Completed Projects'} icon={faBriefcase}/>
                <BottomContent counter={'400k+'} description={'Client Reviews'} icon={faMagnifyingGlass}/>
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
                    <li className="counter">{counter}</li>
                    <li className="description">{description}</li>
                </ul>
            </div>
        </Col>
    )
}



const ContentRight = () => {
    return (
        <div className="content-right">
            <div className="title-header">
                <h3>Contact Me?</h3>
                <div className="description">
                    For your car we will do everything advice design in us repairs 
                    and maintenance We are the some preferred.
                </div>
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