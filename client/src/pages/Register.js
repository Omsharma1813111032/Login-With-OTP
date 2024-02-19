import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "../styles/mix.css"
import {registerFunction} from "../services/apis"




const Register = () => {

  const [inputval,setInput] = useState(
    {
      fname:"",
      email:"",
      password:""
    }
  )

  const registerHandle = async(e) =>{
    e.preventDefault()

    const {fname,email,password} = inputval

    if(email===""){
      toast.error("Please Enter Email")
    }else if(!email.includes('@')){
      toast.error("Valid Email Please")
    }else if(fname===""){
      toast.error("Please Enter Name")
    }else if(password===""){
      toast.error("Please Enter Password")
    }else if(password.length<6){
      toast.error("Password Should be More Than 6 Letter")
    }else{
      const response = await registerFunction(inputval)
      console.log(response)
      if(response.status===200){
        toast.success("User Registered !!")
        setInput({...inputval,fname:"",email:"",password:""})
      }
    }



  }
  
  
  
  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Sign Up</h1>
            <p style={{textAlign:"center",marginLeft:"15px",marginRight:"15px"}} >We are glad that you will be using VSON o manage your task! We hope that you will like it </p>
          </div>

          <form  onSubmit={registerHandle} >
            <div className='form_input'>
              <label htmlFor='fname'>Name</label>
              <input type='text' name="fname" value={inputval.fname} onChange={(e)=>{setInput({...inputval,fname:e.target.value})}}  id="fname"  placeholder='Enter Your Name' />
            </div>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input type='email' name="email" value={inputval.email} onChange={(e)=>{setInput({...inputval,email:e.target.value})}} id="email"  placeholder='Enter Your Email Address' />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <input type='password' name="password" value={inputval.password} onChange={(e)=>{setInput({...inputval,password:e.target.value})}} id="password"  placeholder='Enter Your Email Address' />
            </div>

            <button className='btn' >Sign Up</button>
            <p>Don't Have an Account? <NavLink to="/login" >Sign In</NavLink></p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Register