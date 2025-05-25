import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faBars,
   faMoon,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'






const TopNavigation = ({ theme, scrollToView, toggleApp, toggleAppTheme, toggleNavigation}) => {
  
  return (
    <div className="top-navigation-container">
        <div className="inner-navigation">
            <NavigationLeft/>
            <NavigationMiddle scrollToView={scrollToView} toggleApp={toggleApp}/>
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
          <div className="title">Portf<span>olio</span></div>
        </NavLink>
      </div>
    )
}



const NavigationMiddle = ({scrollToView, toggleApp}) => {
    return (
      <div className="navigation-middle">
        <ul>
            <li onClick={() => scrollToView('home')}>Home</li>
            <li>
              <NavLink onClick={() => toggleApp('admin')} to="/dashboard">Dashboard</NavLink>
            </li>
            <li onClick={() => scrollToView('about')}>About</li>
            <li onClick={() => scrollToView('services')}>Services</li>
            <li onClick={() => scrollToView('projects')}>Projects</li>
            <li onClick={() => scrollToView('contact')}>Contact</li>
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
  

  