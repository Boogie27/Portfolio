import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'











const Login = ({ setIsLoggedIn, preloader, alertNotification }) => {
    const navigate = useNavigate()
    const detectKeyPressRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [button, setButton] = useState(false)

    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')





    const LoginUser = () => {
        initErrorAlert() //initialize form input error alert
        const validate = validate_input(email, password)
        if(validate === false) return 
        const content = {
            email: email,
            password: password,
            rememberMe: rememberMe,
        }
        setButton(true)
        preloader(true, 'Please wait...')
        Axios.post(url('/api/admin/login-user'), content).then((response) => {
            const data = response.data
            if(data.status === 'error'){
                alertNotification('error', data.message)
            }else if(data.status === 'input-error'){
                inputErrorForBackend(data.validationError)
            }else if(data.status === 'ok'){
                Cookies.set('Eloquent_token', data.token, { expires: data.duration })
                setButton(false)
                preloader(false)
                setIsLoggedIn(true)
                navigate('/dashboard')
            }
            setButton(false)
            return preloader(false)
        }).catch(error => {
            setButton(false)
            preloader(false)
            console.log(error)
        })
    }

    const initErrorAlert = () => {
        setEmailAlert('')
        setPasswordAlert('')
    }

    const inputErrorForBackend = (error) => {
        setEmailAlert(error.email)
        setPasswordAlert(error.password)
    }

    // validate input
    const validate_input = (email='', password='') => {
        let failed = false;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(email.length === 0){
            failed = true;
            setEmailAlert("*Email field is required")
        } else if(!email.match(validRegex)){
            failed = true;
            setEmailAlert("*Invalid email address")
        }
        if(password.length === 0){
            failed = true
            setPasswordAlert(`*Password field is required`)
        } else if(password.length < 3){
            failed = true
            setPasswordAlert(`*Must be minimum of 12 characters`)
        }else if(password.length > 50){
            failed = true
            setPasswordAlert(`*Must be maximum of 50 characters`)
        }
       
        if(failed === true){
            return false
        }else{
            return true
        }
    }

    const detectKeyPress = (e) => {
        // if(e.key === 'Enter' && !button){
        //     LoginUser()
        // }
    }



    detectKeyPressRef.current = detectKeyPress

    useEffect(() => {
        
        document.addEventListener('keydown', detectKeyPressRef.current(), true) //login user when enter key is pressed
    }, [])

  return (
    <div className="auth-container">
        <div className="login-form">
            <div className="title-header">
                <h3>ADMIN LOGIN</h3>
                <p>Login to access the Portifolio dashboard</p>
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}  value={email} className="form-control" placeholder="Enter email"/>
                <FormInputAlert alert={emailAlert}/>
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}  value={password}className="form-control" placeholder="Enter password"/>
                <FormInputAlert alert={passwordAlert}/>
            </div>
            <div className="form-extra">
                <div className="left">
                    <label>Remember Me</label>
                    <FontAwesomeIcon onClick={() => setRememberMe(!rememberMe)} className="icon active" icon={rememberMe ? faToggleOn : faToggleOff} />
                </div>
                <div className="right">
                    <NavLink to="/dashboard/login">Forgot Password</NavLink>
                </div>
            </div>
            <div className="form-button">
                { 
                    button ? (
                        <button type="button">PLEASE WAIT...</button>
                    ) : (
                        <button onClick={() => LoginUser()} type="button">LOGIN</button>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Login





// const BackgroundImage = () => {
//     return (
//         <div className="image">
//             <img src={auth_image('key.webp')} alt='login'/>
//         </div>
//     )
// }