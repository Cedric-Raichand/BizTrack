import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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



  const [loading, setLoading] = useState(false);





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };








  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      setLoading(true);



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




    } finally {


      setLoading(false);


    }


  };








  return (


    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">


      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">


        <div className="text-center mb-8">


          <h1 className="text-4xl font-bold text-blue-600">

            BizTrack

          </h1>


          <p className="text-gray-500 mt-2">

            Manage your business finances easily

          </p>


        </div>







        <h2 className="text-2xl font-bold mb-6 text-gray-800">

          Welcome Back

        </h2>







        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >





          <div>


            <label className="block mb-2 text-gray-700 font-medium">

              Email

            </label>


            <input

              type="email"

              name="email"

              placeholder="Enter your email"

              value={formData.email}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"

              required

            />


          </div>







          <div>


            <label className="block mb-2 text-gray-700 font-medium">

              Password

            </label>


            <input

              type="password"

              name="password"

              placeholder="Enter your password"

              value={formData.password}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"

              required

            />


          </div>







          <button

            type="submit"

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"

          >


            {

              loading ?

              "Logging in..." :

              "Login"

            }


          </button>






        </form>







        <p className="text-center mt-6 text-gray-600">


          Don't have an account?


          {" "}


          <Link

            to="/register"

            className="text-blue-600 font-semibold hover:underline"

          >

            Register

          </Link>


        </p>





      </div>


    </div>


  );

}


export default Login;