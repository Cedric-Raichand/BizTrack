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


    } catch(error) {

      console.log(
        error.response?.data || error.message
      );

    }

  };



  return (

    <div>


      <h1>
        Create Business
      </h1>


      <form onSubmit={handleSubmit}>


        <input
          name="businessName"
          placeholder="Business name"
          onChange={handleChange}
        />


        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />


        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />


        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />


        <button type="submit">
          Create
        </button>


      </form>


    </div>

  );

};


export default CreateBusiness;