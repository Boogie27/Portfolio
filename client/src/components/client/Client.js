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
    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const skillsRef = useRef(null)
    const servicesRef = useRef(null)
    const projectsRef = useRef(null)
    const contactRef = useRef(null)
    const qualificationsRef = useRef(null)
    const testimonialRef = useRef(null)
    const setThemeAutoRef = useRef(null)
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

    // toggle app state if admin or client
    const toggleApp = (state) => {
        setAppState(state)
      }

    // action preloader
    const loader = (state=false, text='') => {
        setIsLoading({ state: state, text: text})
    }
    // onclick smooth scroll 
    const scrollToView = (item) => {
        if(item === 'home'){homeRef.current?.scrollIntoView({ behavior: 'smooth' }) }
        if(item === 'services'){servicesRef.current?.scrollIntoView({ behavior: 'smooth' })}
        if(item === 'about'){aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
        if(item === 'projects'){projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        if(item === 'contact'){contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
        if(item === 'contact'){contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
        if(item === 'skills'){skillsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        if(item === 'testimonial'){testimonialRef.current?.scrollIntoView({ behavior: 'smooth' })}
    }


    
    setThemeAutoRef.current = setThemeAuto

    useEffect(() => {
        setThemeAutoRef.current()
    }, [])

  return (
    <div className={`portfolio-container ${theme}`}>
        <Preloader/>
        { isLoading.state ? (<ActionPreloader text={isLoading.text}/>) : null }
        <Navigation theme={theme} scrollToView={scrollToView} toggleApp={toggleApp} setTheme={setTheme}/>
            <Routes>
                <Route path="/" element={<Home loader={loader} homeRef={homeRef} testimonialRef={testimonialRef} aboutRef={aboutRef} qualificationsRef={qualificationsRef} skillsRef={skillsRef} servicesRef={servicesRef} contactRef={contactRef} projectsRef={projectsRef} alertNotification={alertNotification}/>}/>
            </Routes>
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default Client
