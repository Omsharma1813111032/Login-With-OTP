import React, { useState } from 'react'
import "../styles/mix.css"
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {sendOtpFunction} from "../services/apis"

const Login = () => {

  const [email,setEmail] = useState("")
  // console.log(email)

  const sendOtp = async(e) =>{
    e.preventDefault()

    if(email===""){
      toast.error("Please Enter Email !!",{
        position:toast.POSITION.TOP_CENTER
      })
    }else if(!email.includes('@')){
      toast.error("Please Enter Valid Email !!",{
        position:toast.POSITION.TOP_CENTER
      })
    }else{
      const data = {
        email:email
      }

      const response  = await sendOtpFunction(data)
      console.log(response)

    }


  }

  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Log In</h1>
            <p>Here we are glad you are back. Please login</p>
          </div>

          <form onSubmit={sendOtp}>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input type='email' name="email" id="email"  placeholder='Enter Your Email Address' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>

            <button className='btn'>Log In</button>
            <p>Don't Have an Account? <NavLink to="/register" >Sign Up</NavLink></p>
            
          </form>

        </div>
      </section>
      <ToastContainer />

    </>
  )
}

export default Login