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
import { useDispatch } from 'react-redux'
import { fetchUser } from '../redux/admin/UserSlice'












const Admin = ({setAppState}) => {
    const navigate = useNavigate()
    const preloaderRef = useRef(null)
    const setThemeAutoRef = useRef(null)
    const fetchLoggedInUserRef = useRef(null)
    const [theme, setTheme] = useState('dark')
    const [user, setUser] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isLoading, setIsLoading] = useState({ state: true, text: 'Loading...'})

    // redux store
    const dispatch = useDispatch()
   

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
        let pageTheme = Cookies.get('Eloquent-theme')
        if(pageTheme){
            return setTheme(pageTheme)
        }
    }

    // check if user is loggedin
    const fetchLoggedInUser = () => {
        let token = Cookies.get('Eloquent_token')
        if(token){
            Axios.get(url(`/api/admin/fetch-active-user/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'error'){
                    alertNotification('error', data.message)
                    return navigate('/dashboard/login')
                }else if(data.status === 'ok'){
                    setIsLoggedIn(true)
                    setUser(data.user)
                    dispatch(fetchUser(data.user))
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
        { isLoggedIn ? (<Navigation theme={theme} setTheme={setTheme} setAppState={setAppState}/>) : null }
        <Routes>
            <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}>
                <Route path="/dashboard" element={<DashBoard/>}/>
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
