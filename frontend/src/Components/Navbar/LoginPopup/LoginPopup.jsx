import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../Context/StoreContent'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

    // Now we have to fetch api using context api
    const {url,setToken} = useContext(StoreContext)
    const [currentState,setCurrentState] = useState( "Login" )
    const [data,setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))
    }
    const onLogin = async (event) => {
        event.preventDefault()               // it prevents from reloading the page after clicking on Login
        let newUrl = url
        if (currentState === 'Login') {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
        }
        const response = await axios.post(newUrl,data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
            setShowLogin(false)   // after successfully saving the token of user then hide the login popup
        } else {
            toast.error(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>                       {/* Here we have to display one login or sign up state..So we have to create one state */}
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currentState==='Login'
            ?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup