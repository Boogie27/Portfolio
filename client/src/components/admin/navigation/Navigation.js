import { useState } from 'react'
import TopNavigation from './TopNavigation'
import SideNavigation from './SideNavigation'
import Cookies from 'js-cookie'





const Navigation = ({ theme, setTheme, setAppState}) => {
  const [sideNav, setSideNav] = useState(false)


    const toggleAppTheme = () => {
        let state = theme === 'dark' ? 'light' : 'dark'
        setTheme(state)
        Cookies.set('Eloquent-theme', state, { expires: 7 })
    }


    const toggleNavigation = () => {
      setSideNav(!sideNav)
    }

    const toggleApp = (state) => {
      setSideNav(false)
      setAppState(state) // switch app state between client and admin
    }
  
  
    
  return (
    <div className="main-navigation">
      <TopNavigation theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme} toggleApp={toggleApp}/>
      <SideNavigation theme={theme} toggleApp={toggleApp} sideNav={sideNav} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
    </div>
  )
}

export default Navigation
