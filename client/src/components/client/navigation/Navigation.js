import { useState } from 'react'
import TopNavigation from './TopNavigation'
import SideNavigation from './SideNavigation'
import Cookies from 'js-cookie'





const Navigation = ({ theme, scrollToView, toggleApp, setTheme }) => {
  const [sideNav, setSideNav] = useState(false)


    const toggleAppTheme = () => {
        let state = theme === 'dark' ? 'light' : 'dark'
        setTheme(state)
        Cookies.set('Eloquent-theme', state, { expires: 7 })
    }


    const toggleNavigation = () => {
      setSideNav(!sideNav)
    }

    const sideScrollToView = (item) => {
      scrollToView(item)
      setSideNav(false)
    }
    
  return (
    <div className="main-navigation">
      <TopNavigation theme={theme} scrollToView={scrollToView} toggleApp={toggleApp} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
      <SideNavigation theme={theme} sideNav={sideNav} sideScrollToView={sideScrollToView} toggleApp={toggleApp} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
    </div>
  )
}

export default Navigation
