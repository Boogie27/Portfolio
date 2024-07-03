import { Route, Routes } from 'react-router-dom'
import './css/Style.css'
import Home from './home/Home'
import Navigation from './navigation/Navigation'
import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import Footer from './footer/Footer'
import Preloader from './preloader/Preloader'
import ActionPreloader from './preloader/ActionPreloader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const Client = ({setAppState}) => {
    const setThemeAutoRef = useRef(null)
    const preloaderRef = useRef(null)
    const [theme, setTheme] = useState('dark')
    const [isLoading, setIsLoading] = useState({ state: false, text: 'Loading...'})


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

     // set theme when page loads
     const setThemeAuto = () => {
        let pageTheme = Cookies.get('Eloquent-theme')
        if(pageTheme){
            return setTheme(pageTheme)
        }
    }

    // action preloader
    const loader = (state=false, text='') => {
        setIsLoading({ state: state, text: text})
    }


    setThemeAutoRef.current = setThemeAuto

    useEffect(() => {
        setThemeAutoRef.current()
    }, [])

  return (
    <div className={`portfolio-container ${theme}`}>
        <Preloader/>
        { isLoading.state ? (<ActionPreloader text={isLoading.text}/>) : null }
        <Navigation theme={theme} setTheme={setTheme} setAppState={setAppState}/>
            <Routes>
                <Route path="/" element={<Home loader={loader} alertNotification={alertNotification}/>}/>
            </Routes>
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default Client
