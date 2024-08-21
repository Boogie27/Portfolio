import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars,
  faMoon,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'




const SideNavigation = ({ theme, sideNav, SideNavScrollToContent, toggleNavigation, toggleAppTheme}) => {


  return (
    <div className={`side-navigation-container ${sideNav ? 'active' : ''}`}>
      <div onClick={() => toggleNavigation()} className="dark-skin"></div>
      <div className="side-navigation-body">
        <TitleHeader theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
        <div className="side-nav-content">
          <NavigationLinks SideNavScrollToContent={SideNavScrollToContent}/>
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



const NavigationLinks = ({SideNavScrollToContent}) => {
  return (
    <div className="side-navigation-links">
        <ul>
            <li onClick={() => SideNavScrollToContent('home')}>Home</li>
            <li onClick={() => SideNavScrollToContent('about')}>About</li>
            <li onClick={() => SideNavScrollToContent('skill')}>Skills</li>
            <li onClick={() => SideNavScrollToContent('service')}>Services</li>
            <li onClick={() => SideNavScrollToContent('portfolio')}>Portfolio</li>
            <li onClick={() => SideNavScrollToContent('contact')}>Contact Me</li>
            <li onClick={() => SideNavScrollToContent('qualification')}>Qualification</li>
        </ul>
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










