import Axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import { userImage, url } from '../../../File'
import HTMLReactParser from 'html-react-parser'
import AOS from 'aos'






const Banner = ({bannerRef}) => {
  const [homeBanners, setHomeBanners] = useState([])

  const homeBannerRef = useRef()

  const getHomeBanners = () => {
    Axios.get(url('/api/client/fetch-home-banners')).then((response) => {
        const data = response.data
        if(data.status === 'ok'){
            let banner = data.content
            setHomeBanners(banner)
        }
    }).catch(error => {
        console.log(error)
    })
}

  homeBannerRef.current = getHomeBanners

  useEffect(() => {
    AOS.init({ duration: 2000 })
    window.scrollTo(0, 0) // page scroll to top
    homeBannerRef.current()
}, [])

  return (
    <div ref={bannerRef} className="banner-container">
      <Row className="show-grid">
          <Col xs={12} sm={12} md={12} lg={12} xl={7}><ContentLeft homeBanners={homeBanners}/></Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={5}><ContentRight homeBanners={homeBanners}/></Col>
      </Row>
    </div>
  )
}

export default Banner





const ContentLeft = ({homeBanners}) => {
  return (
    <div className="content-left">
        <div data-aos={'slide-left'} className="title-header">
          <h3>{homeBanners.first_header}</h3>
          <h3>{homeBanners.second_header} <span>{homeBanners.span_header}</span></h3>
        </div>
        <div data-aos={'fade'} className="body">
          {homeBanners.description ? HTMLReactParser(homeBanners.description) : 'I am a software engineer' }
        </div>
        <div data-aos={'fade-down-right'} className="button">
          <button type="button">
            Download CV 
            <FontAwesomeIcon className="icon" icon={faDownload} />
          </button>
        </div>
    </div>
  )
}




const ContentRight = ({homeBanners}) => {
  const image = homeBanners.image ? homeBanners.image : 'demo.png'
  return (
    <div className="content-right">
      <div data-aos={'zoom-in'} className="image">
        <img src={userImage(image)} alt="banner"/>
      </div>
    </div>
  )
}