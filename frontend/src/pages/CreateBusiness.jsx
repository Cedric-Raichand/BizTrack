import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";


function CreateBusiness() {

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({

    businessName: "",
    category: "",
    description: "",
    location: ""

  });





  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };







  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      setLoading(true);



      await API.post(

        "/business",

        formData

      );



      toast.success(

        "Business created successfully"

      );




      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);




    }catch(error){



      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Failed to create business"

      );



    } finally {


      setLoading(false);


    }


  };







  return (


    <Layout>


      <div className="max-w-xl mx-auto">



        <div className="bg-white shadow rounded-xl p-8">



          <h1 className="text-3xl font-bold mb-6">

            Create Business

          </h1>







          <form

            onSubmit={handleSubmit}

            className="space-y-5"

          >





            <input

              type="text"

              name="businessName"

              placeholder="Business Name"

              value={formData.businessName}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg p-3"

              required

            />







            <input

              type="text"

              name="category"

              placeholder="Category"

              value={formData.category}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg p-3"

              required

            />








            <textarea

              name="description"

              placeholder="Business Description"

              value={formData.description}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg p-3"

              rows="4"

            />







            <input

              type="text"

              name="location"

              placeholder="Location"

              value={formData.location}

              onChange={handleChange}

              disabled={loading}

              className="w-full border rounded-lg p-3"

              required

            />







            <button

              type="submit"

              disabled={loading}

              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"

            >


              {

                loading ?

                "Creating Business..." :

                "Create Business"

              }



            </button>






          </form>




        </div>



      </div>



    </Layout>


  );

}


export default CreateBusiness;