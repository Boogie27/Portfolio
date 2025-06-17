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







const Banner = ({homeRef}) => {
  const [cvs, setCvs] = useState([])
  const [dropdown, setDropdown] = useState(false)
  const [homeBanners, setHomeBanners] = useState([])

  const homeBannerRef = useRef()
  const getUserCvRef = useRef()

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

  // fetch my cv
  const getUserCv = () => {
    Axios.get(url('/api/client/fetch-user-cv')).then((response) => {
        const data = response.data
        if(data.status === 'ok'){
            let cvs = data.cvs
            setCvs(cvs)
        }
    }).catch(error => {
        console.log(error)
    })
  }


  

  // toggle download cv dropdown
  const toggleDownloadCv = (state) => {
    if(state === 'open'){
      setDropdown(true)
    }else{
      setDropdown(false)
    }
  }

  // download cv
const downloadButton = (cv) => {
  Axios.post(
    url('/api/client/download-user-cv'),
    { cv: cv.cv },
    { 
      responseType: 'blob' } // Important: tells Axios to treat response as binary blob
  )
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' }); // Adjust MIME type if necessary
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `${cv.cv_title || 'my-developer'}.pdf` // This is the file name
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(downloadUrl) // Clean up
      setDropdown(false)
    })
    .catch((error) => {
      console.error('Download failed:', error)
    });
};




  getUserCvRef.current = getUserCv
  homeBannerRef.current = getHomeBanners

  useEffect(() => {
    window.scrollTo(0, 0) // page scroll to top
    getUserCvRef.current()
    homeBannerRef.current()
}, [])

  return (
    <div ref={homeRef} className="banner-container">
      <Row className="show-grid">
          <Col xs={12} sm={12} md={12} lg={12} xl={7}><ContentLeft homeBanners={homeBanners} downloadButton={downloadButton} cvs={cvs} dropdown={dropdown} toggleDownloadCv={toggleDownloadCv}/></Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={5}><ContentRight homeBanners={homeBanners}/></Col>
      </Row>
    </div>
  )
}

export default Banner





const ContentLeft = ({ dropdown, cvs, downloadButton, homeBanners, toggleDownloadCv }) => {
  return (
    <div className="content-left">
        <div className="title-header">
          <h3>{homeBanners.first_header}</h3>
          <h3>{homeBanners.second_header} <span>{homeBanners.span_header}</span></h3>
        </div>
        <div className="body">{homeBanners.description ? HTMLReactParser(homeBanners.description) : 'I am a software engineer' }</div>
        <div className="button">
          <button type="button" onClick={() => toggleDownloadCv('open')} >
            Download CV 
            <FontAwesomeIcon className="icon" icon={faDownload} />
          </button>
        </div>
        { dropdown === true ? (<DownloadCv cvs={cvs} downloadButton={downloadButton} toggleDownloadCv={toggleDownloadCv}/>) : null }
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





const DownloadCv = ({cvs, downloadButton, toggleDownloadCv}) => {
  return (
    <div className="content-cv-container">
        <div onClick={() => toggleDownloadCv('close')} className="dark-skin"></div>
        <div className="cv-contents">
            <ul>
              {
                cvs.map((cv, index) => (
                  <li key={index} onClick={() => downloadButton(cv)}>
                    {cv.cv_title}
                    <FontAwesomeIcon className="icon" icon={faDownload} />
                  </li>
                ))
              }
            </ul>
        </div>
    </div>
  )
}





