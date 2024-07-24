import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'






const SideNavigation = ({ theme, sideNav, toggleNavigation, toggleApp, toggleAppTheme}) => {
  const unseenContacts =  6


  return (
    <div className={`side-navigation-container ${sideNav ? 'active' : ''}`}>
      <div onClick={() => toggleNavigation()} className="dark-skin"></div>
      <div className="side-navigation-body">
        <TitleHeader theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
        <div className="side-nav-content">
          <ul>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/banner">Banner</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/about">About</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/skills">Skills</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/portfolio">Portfolio</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/qualifications">Qualifications</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/project">Projects</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/services">Services</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/testimonial">Testimonial</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/contact-header">Contact Header</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/contacts">Contacts <span className="bg-danger badge">{unseenContacts}</span></NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/cv">My CV</NavLink>
              </li>
              <li>
                <NavLink onClick={() => toggleApp('admin')} to="/dashboard/login">Login</NavLink>
              </li>
          </ul>
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
              <h3>Dash<span>Board</span></h3>
          </div>
          <div className="right">
            <FontAwesomeIcon onClick={() => toggleAppTheme()} className={`icon moon ${state}`} icon={faMoon} />
            <FontAwesomeIcon onClick={() => toggleNavigation()} className="icon" icon={faBars} />
          </div>
      </div>
  )
}













