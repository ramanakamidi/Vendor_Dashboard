import React from "react"
const Navbar =({showLoginHandler,showRegisterHandler,showLogout,logoutHandler})=>{

const firmName = localStorage.getItem("firmName")

return(
    <div className="navsection">
        <div className="company">
            Vendor Dashboard
        </div>
        {firmName &&
        <div className="firmname">Firm Name : {firmName}</div>
            }
        <div className="userauth">

            {!showLogout ?<><span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
            </>:<span onClick={logoutHandler}>Logout</span>
            }
    </div>



    </div>



)    
}
export default Navbar;