import Banner from './Banner'
import Services from './Services'
import About from './About'
import ContactMe from './ContactMe'
import Skills from './Skills'
import Portfolio from './Portfolio'
import Testimonial from './Testimonial'
import Review from '../review/Review'




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
      <Review/>
    </div>
  )
}

export default Home
