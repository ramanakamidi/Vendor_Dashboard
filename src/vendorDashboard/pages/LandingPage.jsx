import React from 'react'
import Navbar from "../componets/Navbar"
import Sidebar from '../componets/Sidebar'
import VendorLogin from '../componets/forms/VendorLogin'
import VendorRegister from '../componets/forms/VendorRegister'
import AddFirm from '../componets/forms/AddFirm'
import AddProduct from '../componets/forms/AddProduct'
import { useState,useEffect } from 'react'
import Welcome from '../componets/Welcome'
import AllProducts from '../componets/AllProducts'
const LandingPage = () => {
  const [showLogin,setShowLogin]=useState(false);
  const [showRegister,setShowRegister]=useState(false);
  const [showFirm,setShowFirm]=useState(false)
  const [showProduct,setShowProduct]=useState(false)
  const [showWelcome,setShowWelcome]=useState(false)
  const [showallproducts,setShowallproducts]=useState(false)
  const [showLogout,setShowLogout]=useState(false);

  useEffect(()=>{
    const token=localStorage.getItem("token");
      if(token){
        setShowLogout(true)
      }
      else{
        setShowLogout(false)
      }
  },[])

      const logoutHandler =()=>{
        window.confirm("are you sure to logout")
        localStorage.removeItem("token");
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName")
        setShowLogout(false)
    }


  const showallproductHandler=()=>{
    setShowRegister(false)
    setShowLogin(false);
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowallproducts(true)
  }


  const showLoginHandler=()=>{
    setShowRegister(false)
    setShowLogin(true);
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowallproducts(false)
  }

    const showRegisterHandler=()=>{
      setShowLogin(false)
      setShowRegister(true);
      setShowFirm(false)
      setShowProduct(false)
      setShowWelcome(false)
      setShowallproducts(false)
  }

    const showFirmHandler=()=>{
      setShowLogin(false)
      setShowRegister(false);
      setShowFirm(true)
      setShowProduct(false)
      setShowWelcome(false)
      setShowallproducts(false)
    
  }
      const showProductHandler=()=>{
      setShowLogin(false)
      setShowRegister(false);
      setShowFirm(false)
      setShowProduct(true)
      setShowWelcome(false)
      setShowallproducts(false)
    
  }

        const showWelcomeHandler=()=>{
      setShowLogin(false)
      setShowRegister(false);
      setShowFirm(false)
      setShowProduct(false)
      setShowWelcome(true)
      setShowallproducts(false)
    
  }


  return (
  <>
  <section className='landingsection'>
    <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
    <div className='sidelogin'>
    <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showallproductHandler={showallproductHandler}/>
    {showLogin && <VendorLogin showWelcomeHandler={showWelcomeHandler}/>}
    {showRegister && <VendorRegister showLoginHandler={showLoginHandler} />}
    {showFirm && <AddFirm/>}
    {showProduct && <AddProduct/>}
    {showWelcome && <Welcome/>}
    {showallproducts && <AllProducts/>}
    </div>
  </section>
  </>
)}

export default LandingPage
