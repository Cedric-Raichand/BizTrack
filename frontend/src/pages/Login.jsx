import { useState } from "react";
import API from "../api/axios";


function Login() {

  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );


      console.log(response.data);


      // store token
      localStorage.setItem(
        "token",
        response.data.token
      );


      alert("Login successful");


    } catch(error) {

      console.log(error.response?.data);

      alert("Login failed");

    }
  };


  return (
    <div>

      <h1>Login</h1>


      <form onSubmit={handleSubmit}>

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
          Login
        </button>


      </form>

    </div>
  );
}


export default Login;