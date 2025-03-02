import Axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDownload,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { userImage, url } from '../../../File'
import HTMLReactParser from 'html-react-parser'





const About = () => {
    const FetchUserAboutRef = useRef()
    const [aboutMe, setAboutMe] = useState([])

    // const aboutMe = {
    //     title: "About Me",
    //     header: "Transforming visions into exceptional",
    //     span: "portfolios",
    //     text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qui ratione",
    //     image: "2.jpg",
    //     activity: "Coding and exercising exercising exercising"
    // }



    // fetch service header
    const FetchUserAbout = () => {
        Axios.get(url('/api/cleint/fetch-client-about')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setAboutMe(data.about)
            }else if(data.status === 'error'){
                console.log(data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    FetchUserAboutRef.current = FetchUserAbout

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchUserAboutRef.current()
    }, [])


    return (
        <div className="about-us-container">
            <div className="inner-about-us">
                <div className="title-header">
                    <h3>{aboutMe.title}</h3>
                </div>
                <div className="body">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <ContentLeft aboutMe={aboutMe}/>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                            <ContentRight aboutMe={aboutMe}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}


export default About





const ContentLeft = ({aboutMe}) => {
    return (
        <div className="content-left">
            <div className="title">
                <h1>{aboutMe.header} <span>{aboutMe.span}</span></h1>
            </div>
            <div className="body">{ aboutMe.text ? (HTMLReactParser(aboutMe.text)) : null }</div>
            <div className="button">
                <button type="button">
                    Download CV 
                    <FontAwesomeIcon className="icon" icon={faDownload} />
                </button>
            </div>
        </div>
    )
}





const ContentRight = ({aboutMe}) => {
    return (
        <div className="content-right">
            <div className="image">
                <img src={userImage(aboutMe.image)} alt="about-us"/>
            </div>
            <div className="bottom-content">
                <ul>
                    <li><FontAwesomeIcon className="icon" icon={faLayerGroup} /></li>
                    <li>
                        <h3>Daily Activity</h3>
                        <p>{aboutMe.activity}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}