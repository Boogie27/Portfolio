import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faBars,
   faMoon,
} from '@fortawesome/free-solid-svg-icons'





const TopNavigation = ({ theme, toggleAppTheme, toggleNavigation}) => {
  return (
    <div className="top-navigation-container">
        <div className="inner-navigation">
            <NavigationLeft/>
            <NavigationMiddle/>
            <NavigationRight theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
        </div>
    </div>
  )
}

export default TopNavigation







const NavigationLeft = () => {
    return (
      <div className="navigation-left">
        <NavLink to="/">
          <div className="logo"></div>
          <div className="title">Dash<span>board</span></div>
        </NavLink>
      </div>
    )
}



const NavigationMiddle = () => {
    return (
      <div className="navigation-middle">
        <ul>
            <li>
              <NavLink to="/dashboard/banner">Banner</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/">Contact</NavLink>
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
  

  