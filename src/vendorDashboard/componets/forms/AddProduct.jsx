import React, { useState } from "react";
import { apiUrl } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleCategory = (e) => {
    const val = e.target.value;

    if (e.target.checked) {
      setCategory((prev) => [...prev, val]);
    } else {
      setCategory((prev) => prev.filter((item) => item !== val));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const firmId= localStorage.getItem("firmId");

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("bestSeller", bestSeller);
    formData.append("description", description);
    formData.append("image", image);

    category.forEach((c) => formData.append("category", c));

    try {
      const response = await fetch(`${apiUrl}/product/addproduct/${firmId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      if(response.ok){
        alert("product added successfully")
      }

      const data = await response.json();
      
      console.log(data);

    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="productsection">
      <form className="protableform" onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Category */}
        <div className="category">
          <label className="category-label">Category</label>
          <div className="check-container">
            <label className="checkbox-item">
              <input
                type="checkbox"
                value="veg"
                onChange={handleCategory}
              />
              <span>Veg</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                value="non-veg"
                onChange={handleCategory}
              />
              <span>Non-Veg</span>
            </label>
          </div>
        </div>

        {/* Bestseller */}
        <label>Bestseller</label>
        <div className="radio-field">
<label>
          <input
            type="radio"
            name="bestseller"
            value="yes"
            onChange={(e) => setBestSeller(e.target.value)}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="bestseller"
            value="no"

            onChange={(e) => setBestSeller(e.target.value)}
          />
          No
        </label>
        </div>
        

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Product Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
