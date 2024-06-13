import { useState, useEffect } from 'react'
import { auth_image } from '../../../File'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'






const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [button, setButton] = useState(false)

    const [userNameAlert, setUserNameAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')

    const LoginUser = () => {
        initErrorAlert() //initialize form input error alert
        const validate = validate_input(username, password)
        if(validate === false) return 
        const content = {
            username: username,
            password: password,
            rememberMe: rememberMe,
        }
        console.log(content)
        // setButton(true)
        Axios.post(url('/api/admin/login-user'), content).then((response) => {
            const data = response.data
            if(data.status === 'input-error'){

            }
             
        }).catch(error => {
            setButton(false)
            console.log(error)
        })
    }

    const initErrorAlert = () => {
        setUserNameAlert('')
        setPasswordAlert('')
    }

    // validate input
    const validate_input = (username='', password='') => {
        let failed = false;

        if(username.length === 0){
            failed = true
            setUserNameAlert(`*Username field is required`)
        } else if(username.length < 3){
            failed = true
            setUserNameAlert(`*Must be minimum of 3 characters`)
        }else if(username.length > 50){
            failed = true
            setUserNameAlert(`*Must be maximum of 50 characters`)
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

  return (
    <div className="auth-container">
        <div className="image">
            <img src={auth_image('key.webp')} alt='login'/>
        </div>
        <div className="login-form">
            <div className="title-header">
                <h3>ADMIN LOGIN</h3>
            </div>
            <div className="form-group">
                <label>Username:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)}  value={username} className="form-control" placeholder="Enter username"/>
                <FormInputAlert alert={userNameAlert}/>
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
