import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { toast } from "react-toastify";
import { useBusiness } from "../context/BusinessContext";


function CreateTransaction() {


  const navigate = useNavigate();


  const { selectedBusiness } = useBusiness();



  const [formData, setFormData] = useState({

    type: "income",

    title: "",

    amount: "",

    category: "",

    description: ""

  });





  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });


  };







  const handleSubmit = async(e)=>{


    e.preventDefault();



    if(!selectedBusiness){

      toast.error(
        "Please select a business first"
      );

      return;

    }





    try{


      await API.post(

        "/transactions",

        {

          ...formData,

          businessId: selectedBusiness._id

        }

      );




      toast.success(

        "Transaction added successfully"

      );



      setTimeout(()=>{

        navigate("/dashboard");

      },1000);





    }catch(error){



      console.log(
        error.response?.data
      );



      toast.error(

        error.response?.data?.message ||

        "Failed to add transaction"

      );


    }


  };







  return(


    <div className="max-w-xl mx-auto mt-10">


      <div className="bg-white shadow rounded-xl p-8">



        <h1 className="text-3xl font-bold mb-6">

          Add Transaction

        </h1>




        <p className="mb-4 text-gray-500">

          Business:

          {" "}

          {selectedBusiness?.businessName || "None"}

        </p>





        <form

          onSubmit={handleSubmit}

          className="space-y-4"

        >




          <select

            name="type"

            value={formData.type}

            onChange={handleChange}

            className="w-full border p-3 rounded"

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

            placeholder="Title"

            value={formData.title}

            onChange={handleChange}

            className="w-full border p-3 rounded"

            required

          />







          <input

            type="number"

            name="amount"

            placeholder="Amount"

            value={formData.amount}

            onChange={handleChange}

            className="w-full border p-3 rounded"

            required

          />







          <input

            type="text"

            name="category"

            placeholder="Category"

            value={formData.category}

            onChange={handleChange}

            className="w-full border p-3 rounded"

            required

          />







          <textarea

            name="description"

            placeholder="Description"

            value={formData.description}

            onChange={handleChange}

            className="w-full border p-3 rounded"

          />







          <button

            type="submit"

            className="w-full bg-green-600 text-white py-3 rounded-lg"

          >

            Save Transaction

          </button>




        </form>



      </div>


    </div>


  );


}


export default CreateTransaction;