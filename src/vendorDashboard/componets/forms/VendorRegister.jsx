import React, { useState } from 'react'
import {apiUrl} from "../../data/apiPath"

const VendorRegister = ({showLoginHandler}) => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      });
      const data = await response.json();
      if (response.ok){
        console.log(data)
        setUsername("")
        setEmail("")
        setPassword("")
        alert("vendor registered successfully");
        showLoginHandler();
      }

    } catch (error) {
      console.log(error,"registration failed");
      alert("Registrtation Failed");
      
    }
  }

  return (
    <div className='loginsection'>
        
        <form className='authform' onSubmit={handleSubmit}>
            <h2>Vendor Registration</h2>
        <label>Username</label>
        <input type='text' name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='enter your Name'/>
        <label>Email</label>
        <input type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your Email'/>
        <label>Password</label>
        <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your Password'/>
        <button type='submit'>Register</button>

        </form>
      
    </div>
  )
}

export default VendorRegister
