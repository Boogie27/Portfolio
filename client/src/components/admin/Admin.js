import './css/Style.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import DashBoard from './dashboard/DashBoard'
import Banner from './banner/Banner'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from './preloader/Preloader'
import Services from './services/Services'







const Admin = () => {
    const [theme, setTheme] = useState('dark')
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
        <Navigation theme={theme} setTheme={setTheme}/>
        <Routes>
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/dashboard/services" element={<Services preloader={preloader} alertNotification={alertNotification}/> }/>
            <Route path="/dashboard/banner" element={<Banner preloader={preloader} alertNotification={alertNotification}/>}/>
        </Routes>
        <ToastContainer />
    </div>
  )
}

export default Admin
