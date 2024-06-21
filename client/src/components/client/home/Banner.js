import Axios from 'axios'
import { useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import { user_image, userImage, url } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeBanners } from '../../redux/admin/BannerSlice'
import HTMLReactParser from 'html-react-parser'







const Banner = () => {
  // redux store
  const dispatch = useDispatch()
  const homeBanners = useSelector(state => state.homeBanners.homeBanners)



  useEffect(() => {
    window.scrollTo(0, 0) // page scroll to top

    const getHomeBanners = () => {
        Axios.get(url('/api/client/fetch-home-banners')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                let banner = data.content
                console.log(data.content)
                dispatch(fetchHomeBanners(banner))
            }
        }).catch(error => {
            console.log(error)
        })
    }
    getHomeBanners()
}, [])

  return (
    <div className="banner-container">
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
        <div className="title-header">
          <h3>{homeBanners.first_header}</h3>
          <h3>{homeBanners.second_header} <span>{homeBanners.span_header}</span></h3>
        </div>
        <div className="body">{homeBanners.description ? HTMLReactParser(homeBanners.description) : 'I am a software engineer' }</div>
        <div className="button">
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
      <div className="image">
        <img src={userImage(image)} alt="banner"/>
      </div>
    </div>
  )
}