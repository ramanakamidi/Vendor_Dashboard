import React,{useState} from 'react'
import { apiUrl } from '../../data/apiPath'

const VendorLogin = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

const handleLogin=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch(`${apiUrl}/vendor/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password})
    })
    const data = await response.json();
    if (response.ok){
      setEmail("")
      setPassword("")
      alert("Login Success");
      console.log(data)
      localStorage.setItem("token",data.token)
      showWelcomeHandler();
    }
    const vendorId = data.vendorId;
    
    const vendorResponse = await fetch(`${apiUrl}/vendor/singlevendor/${vendorId}`)
    const vendorData= await vendorResponse.json();
    if(vendorResponse.ok){
      const vendorFirmId=vendorData.vendorFirmId;
      const vendorFirmName = vendorData.vendor.firm[0].firmName;
      console.log(vendorData)
      localStorage.setItem("firmId",vendorFirmId)
      localStorage.setItem("firmName",vendorFirmName)
      window.location.reload();
    }
  } catch (error) {
    alert("login failed")
    console.log(error,"login failed error")
    
    
  }
}

  return (
    <div className='loginsection'>
        
        <form className='authform' onSubmit={handleLogin}>
            <h2>Vendor Login</h2>
        <label>Email</label>
        <input type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your Email'/>
        <label>Password</label>
        <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your Password'/>
        <button type='submit'>Login</button>

        </form>
      
    </div>
  )
}

export default VendorLogin
