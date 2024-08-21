import './css/Style.css'
import { useState, useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import DashBoard from './dashboard/DashBoard'
import Banner from './banner/Banner'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from './preloader/Preloader'
import Services from './services/Services'
import Login from './auth/Login'
import AboutMe from './about/AboutMe'
import Contacts from './contact/Contacts'
import ContactHeader from './contact/ContactHeader'
import { url } from '../../File'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import ProtectedRoutes from './utility/ProtectedRoutes'
import Skills from './skills/Skills'
import Qualification from './qualification/Qualification'
import Portfolio from './portfolio/Portfolio'
import PortfolioDetail from './portfolio/PortfolioDetail'
import Testimonial from './testimonial/Testimonial'
import Settings from './settings/Settings'
import Review from './review/Review'









const Admin = ({setAppState}) => {
    const navigate = useNavigate()
    const preloaderRef = useRef(null)
    const setThemeAutoRef = useRef(null)
    const fetchLoggedInUserRef = useRef(null)
    const [theme, setTheme] = useState('')
    const [user, setUser] = useState('')
    let token = Cookies.get('Eloquent_token')
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [dashboardSideBar, setDashboardSideBar] = useState(false)
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

    // set theme when page loads
    const setThemeAuto = () => {
        if(!token){
            let pageTheme = Cookies.get('Eloquent-admin-theme')
            if(pageTheme){
                return setTheme(pageTheme)
            }
        }
    }

     // toggle app dashboard
     const toggleAppPage = () => {
        setDashboardSideBar(!dashboardSideBar)
    }

    // check if user is loggedin
    const fetchLoggedInUser = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-active-user/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'error'){
                    alertNotification('error', data.message)
                    return navigate('/dashboard/login')
                }else if(data.status === 'ok'){
                    setIsLoggedIn(true)
                    setUser(data.user)
                    setTheme(data.user.admin_theme)
                    Cookies.set('Eloquent-admin-theme', data.user.admin_theme, { expires: 7 })
                    alertNotification('sucess', 'Login successful!')
                }
                return preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }else{
            navigate('/dashboard/login')
        }
    }

       preloaderRef.current = preloader
       setThemeAutoRef.current = setThemeAuto
       fetchLoggedInUserRef.current = fetchLoggedInUser

    useEffect(() => {
        preloaderRef.current()
        setThemeAutoRef.current()
        fetchLoggedInUserRef.current()
    }, [])


  return (
    <div className={`admin-container ${theme}`}>
        { isLoading.state ? (<Preloader text={isLoading.text}/>) : null }
        { isLoggedIn ? (<Navigation theme={theme} setTheme={setTheme} toggleAppPage={toggleAppPage} setAppState={setAppState} alertNotification={alertNotification}/>) : null }
        <Routes>
            <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}>
                <Route path="/dashboard" element={<DashBoard dashboardSideBar={dashboardSideBar}/>}/>
                <Route path="/dashboard/review-request" element={<Review preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/settings" element={<Settings preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/testimonial" element={<Testimonial preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/portfolio/detail/:_id" element={<PortfolioDetail preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/portfolio" element={<Portfolio preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/skills" element={<Skills preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/qualifications" element={<Qualification preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/contacts" element={<Contacts preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/contact-header" element={<ContactHeader preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/about" element={<AboutMe preloader={preloader} alertNotification={alertNotification}/>}/>
                <Route path="/dashboard/services" element={<Services preloader={preloader} alertNotification={alertNotification}/> }/>
                <Route path="/dashboard/banner" element={<Banner user={user} preloader={preloader} alertNotification={alertNotification}/>}/>
            </Route>
            <Route path="/dashboard/login" element={<Login setIsLoggedIn={setIsLoggedIn} preloader={preloader} alertNotification={alertNotification}/>}/>
        </Routes>
        <ToastContainer/>
    </div>
  )
}

export default Admin
