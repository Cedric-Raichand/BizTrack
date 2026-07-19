import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


const CreateBusiness = () => {


  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    location: ""
  });


  const [error, setError] = useState("");



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      await API.post("/business", formData);


      navigate("/dashboard");


    } catch(error){

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Business creation failed"
      );

    }

  };



  return (

    <div>

      <h1>Create Business</h1>


      {
        error && 
        <p>{error}</p>
      }


      <form onSubmit={handleSubmit}>


        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
        />


        <br />


        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />


        <br />


        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />


        <br />


        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />


        <br />


        <button type="submit">
          Create Business
        </button>


      </form>


    </div>

  );

};


export default CreateBusiness;