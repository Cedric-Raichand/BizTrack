import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreateBusiness = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/business", formData);

      alert("Business created successfully!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create business");
    }
  };

  return (
    <div>
      <h1>Create Your Business</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Business
        </button>
      </form>
    </div>
  );
};

export default CreateBusiness;