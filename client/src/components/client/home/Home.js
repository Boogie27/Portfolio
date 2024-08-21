import Banner from './Banner'
import Services from './Services'
import About from './About'
import ContactMe from './ContactMe'
import Skills from './Skills'
import Portfolio from './Portfolio'
import Testimonial from './Testimonial'
import Review from '../review/Review'
import Qualifications from './Qualifications'




const Home = ({ 
  loader, alertNotification, serviceRef, portfolioRef, contactRef, 
  skillsRef, qualificationRef, testimonialRef, aboutRef, bannerRef, isAppReady
}) => {
  return (
    <div>
      <Banner bannerRef={bannerRef}/>
      <Services serviceRef={serviceRef}/>
      <About aboutRef={aboutRef}/>
      <ContactMe contactRef={contactRef} loader={loader} alertNotification={alertNotification}/>
      <Qualifications qualificationRef={qualificationRef}/>
      <Skills skillsRef={skillsRef}/>
      <Portfolio portfolioRef={portfolioRef}/>
      <Testimonial testimonialRef={testimonialRef}/>
      <Review loader={loader} isAppReady={isAppReady}/>
    </div>
  )
}

export default Home
