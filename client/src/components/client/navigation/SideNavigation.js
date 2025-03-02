import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars,
  faMoon,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'




const SideNavigation = ({ theme, sideNav, toggleNavigation, toggleAppTheme}) => {

  const aboutUs = {
    title: "MY RECENT PORTFOLIO",
    text: "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore et magna aliqua. Ut enim ad minim veniam laboris.",
}



  return (
    <div className={`side-navigation-container ${sideNav ? 'active' : ''}`}>
      <div onClick={() => toggleNavigation()} className="dark-skin"></div>
      <div className="side-navigation-body">
        <TitleHeader theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
        <div className="side-nav-content">
          <AboutUs aboutUs={aboutUs}/>
          <ContactUs/>
        </div>
      </div>
    </div>
  )
}

export default SideNavigation






const TitleHeader = ({ theme, toggleNavigation, toggleAppTheme}) => {
  let state = theme === 'dark' ? 'active' : ''
  
  return (
      <div className="title-header">
          <div className="left">
              <h3>PORTF<span>OLIO</span></h3>
          </div>
          <div className="right">
            <FontAwesomeIcon onClick={() => toggleAppTheme()} className={`icon moon ${state}`} icon={faMoon} />
            <FontAwesomeIcon onClick={() => toggleNavigation()} className="icon" icon={faBars} />
          </div>
      </div>
  )
}




const AboutUs = ({aboutUs}) => {
  return (
      <div className="about-us">
          <div className="title">
            {aboutUs.title ? (<h3>About Me</h3>) : null }
          </div>
          <div className="description">
            {aboutUs.text}
          </div>
      </div>
  )
}




const ContactUs = () => {
  return (
      <div className="contact-us">
          <div className="title">
            <h3>Contact me</h3>
          </div>
          <div className="contact-form">
            <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter Name"/>
              </div>
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter Email"/>
              </div>
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter Phone"/>
              </div>
              <div className="form-group">
                  <textarea className="form-control" rows="4" cols="50" placeholder="Write Message..."></textarea>
              </div>
              <div className="form-button">
                  <button type="button">
                      SUBMIT NOW
                      <FontAwesomeIcon className="icon" icon={faEnvelope} />
                  </button>
              </div>
          </div>
      </div>
  )
}










