import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faBars,
   faMoon,
} from '@fortawesome/free-solid-svg-icons'





const TopNavigation = ({ theme, toggleAppTheme, toggleNavigation, toggleApp}) => {
  return (
    <div className="top-navigation-container">
        <div className="inner-navigation">
            <NavigationLeft toggleApp={toggleApp}/>
            <NavigationMiddle toggleApp={toggleApp}/>
            <NavigationRight theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
        </div>
    </div>
  )
}

export default TopNavigation







const NavigationLeft = ({toggleApp}) => {
    return (
      <div className="navigation-left">
        <NavLink onClick={() => toggleApp('client')} to="/">
          <div className="logo"></div>
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
  

  