import React from 'react'

const Sidebar = ({showFirmHandler,showProductHandler,showallproductHandler}) => {
  const firmName = localStorage.getItem("firmName")

  return (
    <div className='sidebarsection'>
        <ul>
            {!firmName && 
            <li onClick={showFirmHandler}>Add Firm</li>
            }
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showallproductHandler}>All Products</li>
            <li>User Details</li>
        </ul>
      
    </div>
  )
}

export default Sidebar
