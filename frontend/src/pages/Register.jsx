import { useState } from "react";
import API from "../api/axios";


function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
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

      const response = await API.post(
        "/auth/register",
        formData
      );

      console.log(response.data);

      alert("Registration successful");

    } catch(error) {

      console.log(error.response?.data);

      alert("Registration failed");

    }
  };


  return (
    <div>

      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />


        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />


        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />


        <button>
          Register
        </button>

      </form>

    </div>
  );
}


export default Register;