import { useState } from 'react'
import TopNavigation from './TopNavigation'
import SideNavigation from './SideNavigation'
import Axios from 'axios'
import { url } from '../../../File'
import Cookies from 'js-cookie'






const Navigation = ({ theme, setTheme, setAppState, toggleAppPage, alertNotification}) => {
  let token = Cookies.get('Eloquent_token')
  const [sideNav, setSideNav] = useState(false)
  const state = theme === 'dark' ? 'light' : 'dark'

  const toggleAppTheme = () => {
    if(token){
      const content = {
        theme: state,
        token: token,
      }
      setTheme(state)
      Axios.post(url('/api/admin/toggle-admin-app-theme'), content).then((response) => {
        const data = response.data
        if(data.status === 'error'){
            alertNotification('error', data.message)
        }else if(data.status === 'ok'){
          Cookies.set('Eloquent-admin-theme', state, { expires: 7 })
        }
      }).catch(error => {
          console.log(error)
          alertNotification('error', 'Something went wrong!')
      })
    }
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
      <TopNavigation theme={theme} toggleAppPage={toggleAppPage} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme} toggleApp={toggleApp}/>
      <SideNavigation theme={theme} toggleApp={toggleApp} sideNav={sideNav} toggleNavigation={toggleNavigation} toggleAppTheme={toggleAppTheme}/>
    </div>
  )
}

export default Navigation
