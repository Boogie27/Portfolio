import About from './About'
import AboutImage from './AboutImage'
import { useState } from 'react'






const AboutMe = ({alertNotification, preloader}) => {
  const [image, setImage] = useState('')

  

  return (
    <div className="dashboard-banner-container">
      <TitleHeader/>
      <AboutImage image={image} setImage={setImage} alertNotification={alertNotification} preloader={preloader}/>
      <About preloader={preloader} image={image} setImage={setImage} alertNotification={alertNotification}/>
    </div>
  )
}

export default AboutMe








const TitleHeader = () => {
  return (
      <div className="top-title-content">
          <div className="title-header">
              <h3>ABOUT ME</h3>
          </div>
      </div>
  )
}
