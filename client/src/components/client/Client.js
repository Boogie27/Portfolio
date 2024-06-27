import { Route, Routes } from 'react-router-dom'
import './css/Style.css'
import Home from './home/Home'
import Navigation from './navigation/Navigation'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Footer from './footer/Footer'
import Preloader from './preloader/Preloader'





const Client = ({setAppState}) => {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
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
    <div className={`portfolio-container ${theme}`}>
        <Preloader/>
        <Navigation theme={theme} setTheme={setTheme} setAppState={setAppState}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        <Footer/>
    </div>
  )
}

export default Client
