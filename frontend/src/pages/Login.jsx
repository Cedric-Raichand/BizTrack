import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


function Login() {


  const { login } = useAuth();

  const navigate = useNavigate();



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



      login(

        response.data.user,

        response.data.token

      );



      toast.success(

        "Login successful"

      );



      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);



    } catch(error) {


      console.log(

        error.response?.data

      );



      toast.error(

        error.response?.data?.message ||

        "Login failed"

      );


    }


  };





  return (

    <div>


      <h1>

        Login

      </h1>



      <form onSubmit={handleSubmit}>


        <input

          type="email"

          name="email"

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          value={formData.password}

          onChange={handleChange}

        />



        <button type="submit">

          Login

        </button>



      </form>



    </div>

  );

}


export default Login;