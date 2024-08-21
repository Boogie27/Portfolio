import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
   faBars,
   faMoon,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'






const TopNavigation = ({ theme, toggleAppTheme, scrollToContent, toggleNavigation, setAppState}) => {
  const toggleApp = (state) => {
    setAppState(state)
  }

  
  return (
    <div className="top-navigation-container">
        <div className="inner-navigation">
            <NavigationLeft/>
            <NavigationMiddle scrollToContent={scrollToContent} toggleApp={toggleApp}/>
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



const NavigationMiddle = ({scrollToContent, toggleApp}) => {
    return (
      <div className="navigation-middle">
        <ul>
            <li onClick={() => scrollToContent('home')}>Home</li>
            {/* <li>
              <NavLink onClick={() => toggleApp('admin')} to="/dashboard">Dashboard</NavLink>
            </li> */}
            <li onClick={() => scrollToContent('about')}>About</li>
            <li onClick={() => scrollToContent('service')}>Services</li>
            <li onClick={() => scrollToContent('portfolio')}>Projects</li>
            <li onClick={() => scrollToContent('contact')}>Contact</li>
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
  

  