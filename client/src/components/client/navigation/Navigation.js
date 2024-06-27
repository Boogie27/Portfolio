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
    
  return (
    <div className="main-navigation">
      <TopNavigation theme={theme} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme} setAppState={setAppState}/>
      <SideNavigation theme={theme} sideNav={sideNav} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
    </div>
  )
}

export default Navigation
