import Banner from './Banner'
import Services from './Services'
import About from './About'
import ContactMe from './ContactMe'
import Skills from './Skills'
import Portfolio from './Portfolio'
import Testimonial from './Testimonial'
import Qualifications from './Qualifications'




const Home = ({ loader, homeRef, qualificationsRef, testimonialRef, skillsRef, contactRef, aboutRef, servicesRef, projectsRef, alertNotification }) => {
  return (
    <div>
      <Banner homeRef={homeRef}/>
      <Services servicesRef={servicesRef}/>
      <About aboutRef={aboutRef}/>
      <ContactMe contactRef={contactRef} loader={loader} alertNotification={alertNotification}/>
      <Qualifications qualificationsRef={qualificationsRef}/>
      <Skills skillsRef={skillsRef}/>
      <Portfolio projectsRef={projectsRef}/>
      <Testimonial testimonialRef={testimonialRef}/>
    </div>
  )
}

export default Home
