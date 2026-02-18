import React,{useEffect,useState} from 'react'
import {apiUrl} from "../data/apiPath"
const AllProducts = () => {
    const [products,setProducts]=useState([])

    const deleteProduct=async(productId)=>{
        try {
            const response = await fetch(`${apiUrl}/product/${productId}`,{
                method:'DELETE'
            })
            if (response.ok){
            confirm("are you sure to delete this product");
            alert("product deleted successfully");
            setProducts(prev=>prev.filter((item)=>item._id!=productId))
            }
            
        } catch (error) {
            console.log(error)
            
        }


    }

    const handleProducts = async()=>{
        const firmId=localStorage.getItem("firmId");
        try {
            const response = await fetch(`${apiUrl}/product/${firmId}/products`)
            const newProductData =await response.json();
            setProducts(newProductData.products)
            console.log(newProductData.products)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        console.log("this is useEffect")
        handleProducts();
    },[])

  return (
    <div>
        {!products?(<p>No products Added</p>):
        (
        
        
        
        <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Image</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {products.map((item) => (
      <tr key={item._id}>
        <td>{item.productName}</td>
        <td>{item.price}</td>
        <td>
          <img
            src={`${apiUrl}/uploads/${item.image}`}
            alt={item.productName}
            width="60"
            height="60"
          />
        </td>
        <td>
          <button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
)}
      
    </div>
  )
}


export default AllProducts
