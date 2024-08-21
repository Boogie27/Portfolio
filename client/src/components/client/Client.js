import { Route, Routes } from 'react-router-dom'
import 'aos/dist/aos.css'
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
    const bannerRef = useRef(null)
    const aboutRef = useRef(null)
    const serviceRef = useRef(null)
    const portfolioRef = useRef(null)
    const contactRef = useRef(null)
    const skillsRef = useRef(null)
    const qualificationRef = useRef(null)
    const testimonialRef = useRef(null)
    const [isAppReady, setIsAppReady] = useState(false)
    const [theme, setTheme] = useState('dark')
    const [isLoading, setIsLoading] = useState({ state: false, text: 'Loading...'})


    // scroll to content
    const scrollToContent = (content) => {
        if(content === 'home'){bannerRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'about'){aboutRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'service'){serviceRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'contact'){contactRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'portfolio'){portfolioRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'skill'){skillsRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'qualification'){qualificationRef.current.scrollIntoView({ behavior: "smooth" })}
        if(content === 'testimonial'){testimonialRef.current.scrollIntoView({ behavior: "smooth" })}
    }

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
        const metaTag = document.querySelector('meta[name="theme-color"]')

        if(pageTheme){
            if(pageTheme === 'light'){
                metaTag.setAttribute("content", '#000000')
            }else{
                metaTag.setAttribute("content", 'rgb(14, 14, 14)')
            }
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
        <Preloader setIsAppReady={setIsAppReady}/>
        { isLoading.state ? (<ActionPreloader text={isLoading.text}/>) : null }
        <Navigation theme={theme} setTheme={setTheme} scrollToContent={scrollToContent} setAppState={setAppState}/>
            <Routes>
                <Route path="/" element={<Home 
                    aboutRef={aboutRef} serviceRef={serviceRef} portfolioRef={portfolioRef} contactRef={contactRef}
                    skillsRef={skillsRef} qualificationRef={qualificationRef} testimonialRef={testimonialRef}
                    bannerRef={bannerRef} loader={loader} alertNotification={alertNotification} isAppReady={isAppReady}/>}
                />
            </Routes>
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default Client
