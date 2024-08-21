import { useState } from 'react'
import TopNavigation from './TopNavigation'
import SideNavigation from './SideNavigation'
import Cookies from 'js-cookie'





const Navigation = ({ theme, setTheme, scrollToContent, setAppState}) => {
  const [sideNav, setSideNav] = useState(false)


    const toggleAppTheme = () => {
        let state = theme === 'dark' ? 'light' : 'dark'
        const metaTag = document.querySelector('meta[name="theme-color"]')

        if(state === 'light'){
            metaTag.setAttribute("content", '#000000')
        }else{
            metaTag.setAttribute("content", 'rgb(14, 14, 14)')
        }
        setTheme(state)
        Cookies.set('Eloquent-theme', state, { expires: 7 })
    }

    // toggle side navigation open or close
    const toggleNavigation = () => {
      setSideNav(!sideNav)
    }

    // scroll to content
    const SideNavScrollToContent = (content) => {
      setSideNav(false)
      scrollToContent(content)
    }
    
  return (
    <div className="main-navigation">
      <TopNavigation theme={theme} scrollToContent={scrollToContent} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme} setAppState={setAppState}/>
      <SideNavigation theme={theme} sideNav={sideNav} SideNavScrollToContent={SideNavScrollToContent} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
    </div>
  )
}

export default Navigation
