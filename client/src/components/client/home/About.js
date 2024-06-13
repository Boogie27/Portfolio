import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDownload,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { user_image } from '../../../File'






const About = () => {
    return (
        <div className="about-us-container">
            <div className="inner-about-us">
                <div className="title-header">
                    <h3>ABOUT ME</h3>
                </div>
                <div className="body">
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
        </div>
    )
}


export default About





const ContentLeft = () => {
    return (
        <div className="content-left">
            <div className="title">
                <h1>Transforming visions into</h1>
                <h1>exceptional <span>portfolios</span></h1>
            </div>
            <div className="body">
                Nemo design enim ipsam voluptatem quim 
                voluptas sit aspernatur aut odit auting fugit sed thisnquia 
                consequuntur magni dolores eos designer heresm qui ratione
            </div>
            <div className="button">
                <button type="button">
                    Download CV 
                    <FontAwesomeIcon className="icon" icon={faDownload} />
                </button>
            </div>
        </div>
    )
}





const ContentRight = () => {
    return (
        <div className="content-right">
            <div className="image">
                <img src={user_image('2.jpg')} alt="about-us"/>
            </div>
            <div className="bottom-content">
                <ul>
                    <li><FontAwesomeIcon className="icon" icon={faLayerGroup} /></li>
                    <li>
                        <h3>Daily Activity</h3>
                        <p>Coding and exercising exercising exercising</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}