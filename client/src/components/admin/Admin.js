import './css/Style.css'
import { useState, useEffect, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import DashBoard from './dashboard/DashBoard'
import Banner from './banner/Banner'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from './preloader/Preloader'
import Services from './services/Services'
import Login from './auto/Login'







const Admin = () => {
    const [theme, setTheme] = useState('dark')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState({ state: true, text: 'Loading...'})
   

    // alert notification
    const alertNotification = (state, messsage) => {
        if(state === 'error'){
            return toast.error(messsage, {theme: theme});
        }else if(state === 'success'){
            return toast.success(messsage, {theme: theme});
        }else if(state === 'warning'){
            return toast.warning(messsage, {theme: theme});
        }
    }

    const preloader = (state='', text='') => {
        setIsLoading({ state: state, text: text})
    }

    useEffect(() => {
        preloader(false, '')

        // set theme when page loads
        const setThemeAuto = () => {
        let pageTheme = Cookies.get('Eloquent-theme')
            if(pageTheme){
                return setTheme(pageTheme)
            }
        }
        setThemeAuto()
    }, [])


  return (
    <div className={`admin-container ${theme}`}>
        { isLoading.state ? (<Preloader text={isLoading.text}/>) : null }
        { isLoggedIn ? (<Navigation theme={theme} setTheme={setTheme}/>) : null }
        <Routes>
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/dashboard/login" element={<Login/>}/>
            <Route path="/dashboard/services" element={<Services preloader={preloader} alertNotification={alertNotification}/> }/>
            <Route path="/dashboard/banner" element={<Banner preloader={preloader} alertNotification={alertNotification}/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  )
}

export default Admin