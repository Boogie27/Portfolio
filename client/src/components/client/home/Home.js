import Banner from './Banner'
import Services from './Services'
import About from './About'
import ContactMe from './ContactMe'
import Skills from './Skills'
import Portfolio from './Portfolio'
import Testimonial from './Testimonial'




const Home = ({ loader, alertNotification }) => {
  return (
    <div>
      <Banner/>
      <Services/>
      <About/>
      <ContactMe loader={loader} alertNotification={alertNotification}/>
      <Skills/>
      <Portfolio/>
      <Testimonial/>
    </div>
  )
}

export default Home
