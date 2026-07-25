import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import { toast } from "react-toastify";


function Register() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",

  });



  const [loading, setLoading] = useState(false);





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };






  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      setLoading(true);



      const response = await API.post(

        "/auth/register",

        formData

      );



      toast.success(

        response.data.message ||

        "Registration successful"

      );



      setTimeout(() => {

        navigate("/login");

      }, 1000);




    } catch (error) {


      console.log(

        error.response?.data ||

        error.message

      );



      toast.error(

        error.response?.data?.message ||

        "Registration failed"

      );



    } finally {


      setLoading(false);


    }


  };






  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">


        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">

          BizTrack

        </h1>



        <p className="text-center text-gray-500 mb-8">

          Create your account

        </p>





        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >



          <div>

            <label className="block mb-2 font-medium">

              Full Name

            </label>



            <input

              type="text"

              name="name"

              placeholder="Enter your name"

              value={formData.name}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

              required

            />


          </div>







          <div>

            <label className="block mb-2 font-medium">

              Email

            </label>



            <input

              type="email"

              name="email"

              placeholder="Enter your email"

              value={formData.email}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

              required

            />


          </div>







          <div>

            <label className="block mb-2 font-medium">

              Password

            </label>



            <input

              type="password"

              name="password"

              placeholder="Create a password"

              value={formData.password}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

              required

            />


          </div>







          <button

            type="submit"

            disabled={loading}

            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"

          >


            {

              loading ?

              "Creating Account..." :

              "Create Account"

            }


          </button>





        </form>







        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}



          <Link

            to="/login"

            className="text-blue-600 font-semibold hover:underline"

          >

            Login

          </Link>


        </p>





      </div>


    </div>

  );

}


export default Register;