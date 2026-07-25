import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";


function EditTransaction(){

  const { id } = useParams();

  const navigate = useNavigate();


  const [loading,setLoading] = useState(false);


  const [formData,setFormData] = useState({

    type:"income",
    title:"",
    amount:"",
    category:"",
    description:""

  });





  useEffect(()=>{

    fetchTransaction();

  },[]);







  const fetchTransaction = async()=>{

    try{


      const res = await API.get(

        `/transactions/${id}`

      );


      setFormData({

        type:res.data.type,

        title:res.data.title,

        amount:res.data.amount,

        category:res.data.category,

        description:res.data.description || ""

      });



    }catch(error){


      toast.error(

        "Failed to load transaction"

      );


    }


  };







  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };








  const handleSubmit=async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      await API.put(

        `/transactions/${id}`,

        formData

      );



      toast.success(

        "Transaction updated successfully"

      );



      setTimeout(()=>{

        navigate("/dashboard");

      },1000);




    }catch(error){


      toast.error(

        error.response?.data?.message ||

        "Update failed"

      );


    }finally{


      setLoading(false);


    }


  };








  return (

    <Layout>


      <div className="max-w-xl mx-auto">


        <div className="bg-white shadow rounded-xl p-8">


          <h1 className="text-3xl font-bold mb-6">

            Edit Transaction

          </h1>




          <form

            onSubmit={handleSubmit}

            className="space-y-5"

          >


            <select

              name="type"

              value={formData.type}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              disabled={loading}

            >

              <option value="income">

                Income

              </option>


              <option value="expense">

                Expense

              </option>


            </select>





            <input

              type="text"

              name="title"

              value={formData.title}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              disabled={loading}

            />





            <input

              type="number"

              name="amount"

              value={formData.amount}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              disabled={loading}

            />





            <input

              type="text"

              name="category"

              value={formData.category}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              disabled={loading}

            />





            <textarea

              name="description"

              value={formData.description}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              disabled={loading}

            />






            <button

              type="submit"

              disabled={loading}

              className="w-full bg-blue-600 text-white py-3 rounded-lg"

            >

              {

                loading ?

                "Updating..." :

                "Update Transaction"

              }


            </button>




          </form>


        </div>


      </div>


    </Layout>

  );

}


export default EditTransaction;