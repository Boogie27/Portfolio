import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faBars,
   faMoon,
   faBarsStaggered,
} from '@fortawesome/free-solid-svg-icons'





const TopNavigation = ({ theme, toggleAppTheme, toggleAppPage, toggleNavigation, toggleApp}) => {
  return (
    <div className="top-navigation-container admin">
        <div className="inner-navigation">
            <NavigationLeft toggleApp={toggleApp} toggleAppPage={toggleAppPage}/>
            {/* <NavigationMiddle toggleApp={toggleApp}/> */}
            <NavigationRight theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
        </div>
    </div>
  )
}

export default TopNavigation







const NavigationLeft = ({toggleApp, toggleAppPage}) => {
    return (
      <div className="navigation-left">
        <div className="bars">
            <FontAwesomeIcon  onClick={() => toggleAppPage()} className="icon" icon={faBarsStaggered} />
        </div>
        <NavLink onClick={() => toggleApp('admin')} to="/dashboard">
          <div className="title">Dash<span>board</span></div>
        </NavLink>
      </div>
    )
}



const NavigationMiddle = ({toggleApp}) => {
    return (
      <div className="navigation-middle">
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
              <NavLink onClick={() => toggleApp('admin')} to="/dashboard/services">Services</NavLink>
            </li>
            <li>
              <NavLink onClick={() => toggleApp('admin')} to="/dashboard/portfolio">Portfolio</NavLink>
            </li>
        </ul>
      </div>
    )
}



const NavigationRight = ({ theme, toggleNavigation, toggleAppTheme}) => {
    let state = theme === 'dark' ? 'active' : ''
    
    return (
      <div className="navigation-right">
            <FontAwesomeIcon onClick={() => toggleAppTheme()} className={`icon moon ${state}`} icon={faMoon} />
            <FontAwesomeIcon onClick={() => toggleNavigation()} className="icon" icon={faBars} />
      </div>
    )
}
  

  