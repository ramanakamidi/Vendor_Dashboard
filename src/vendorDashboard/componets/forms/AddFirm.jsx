import React, { useState } from "react";
import { use } from "react";
import { apiUrl } from "../../data/apiPath";
const AddFirm =()=>{
  const [firmName,setFirmName]=useState("")
  const [area,setArea]=useState("")
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("")
  const [image,setImage]=useState(null)


  const handleCategory = (e) => {
    const val = e.target.value;

    if (e.target.checked) {
      setCategory((prev) => [...prev, val]);
    } else {
      setCategory((prev) => prev.filter((item) => item !== val));
    }
  };

  const handleRegion = (e) => {
    const val = e.target.value;

    if (e.target.checked) {
      setRegion((prev) => [...prev, val]);
    } else {
      setRegion((prev) => prev.filter((item) => item !== val));
    }
  };
  
  //submit handling
  const handleFirmSubmit =async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token){
      console.log("user nott authenticated");
    }

    const formData = new FormData();
    formData.append("firmName",firmName)
    formData.append("area",area);
    formData.append("offer",offer);
    formData.append("image",image);

    category.forEach((c)=>{
      formData.append("category",c)
    })

    region.forEach((i)=>{
      formData.append("region",i)
    })

    try {
      const response = await fetch(`${apiUrl}/firm/addfirm`,{
        method:'POST',
        headers:{
          'Authorization':`Bearer ${token}`
        },
        body:formData
      })
      const data = await response.json()
      console.log(data)
      if(response.ok){
      alert("firm added successfully");
      setArea("")
      setFirmName("")
      setOffer("")
      setImage(null)
      setRegion([])
      setCategory([])
      localStorage.setItem("firmId",data.firmId)
      }
      else if(data.msg=="only one firm can have for vendor"){
        alert(data.msg)
      }
      else{
        alert("error at firm frontend")
      }

      

    } catch (error) {
      console.log(error,"error in addFirm");
      alert("failed to add Firm");
      
    }


  }


    return(
        <div className="firmsection">
            <form className="tableform" onSubmit={handleFirmSubmit}> 
                <label>Firm Name</label>
                <input type="text" name="firmName" value={firmName} onChange={(e)=>{setFirmName(e.target.value)}}/>

                <label>Area</label>
                <input type="text" name="area" value={area} onChange={(e)=>{setArea(e.target.value)}} />

                <div className="category">
                <label className="category-label">Category</label>

                <div className="check-container">
                    <label className="checkbox-item">
                    <input type="checkbox" value="veg" onChange={handleCategory}/>
                    <span>Veg</span>
                    </label>

                    <label className="checkbox-item">
                    <input type="checkbox" value="non-veg" onChange={handleCategory}/>
                    <span>Non-Veg</span>
                    </label>
                </div>
                </div>

                <div className="region">
                <label className="region-label">Region</label>

                <div className="region-container">
                    <label className="region-item">
                    <input type="checkbox" value="south-indian" onChange={handleRegion}/>
                    <span>South-Indian</span>
                    </label>

                    <label className="region-item">
                    <input type="checkbox" value="north-indian" onChange={handleRegion} />
                    <span>North-Indian</span>
                    </label>

                    <label className="region-item">
                    <input type="checkbox" value="chinese" onChange={handleRegion} />
                    <span>Chinese</span>
                    </label>

                    <label className="region-item">
                    <input type="checkbox" value="bakery" onChange={handleRegion} />
                    <span>Bakery</span>
                    </label>

                </div>
                </div>


                <label>Offer</label>
                <input type="text" name="offer"value={offer} onChange={(e)=>{setOffer(e.target.value)}} />

                <label>Image</label>
                <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])}/>

                <button type='submit'>Login</button>

            
            </form>




        </div>



    )
}
export default AddFirm