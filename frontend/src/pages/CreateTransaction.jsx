import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import Layout from "../components/Layout";


function CreateTransaction() {


  const navigate = useNavigate();



  const [formData, setFormData] = useState({

    type: "income",
    title: "",
    amount: "",
    category: "",
    description: ""

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


      await API.post(
        "/transactions",
        formData
      );


      alert("Transaction added successfully");


      navigate("/dashboard");


    } catch(error) {


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Failed to add transaction"
      );


    }

  };



  return (

    <Layout>


      <div className="max-w-xl mx-auto">


        <div className="bg-white shadow rounded-xl p-8">


          <h1 className="text-3xl font-bold mb-6">
            Add Transaction
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

              placeholder="Transaction title"

              value={formData.title}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              required

            />




            <input

              type="number"

              name="amount"

              placeholder="Amount"

              value={formData.amount}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              required

            />




            <input

              type="text"

              name="category"

              placeholder="Category"

              value={formData.category}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

            />




            <textarea

              name="description"

              placeholder="Description"

              value={formData.description}

              onChange={handleChange}

              className="w-full border rounded-lg p-3"

              rows="4"

            />




            <button

              type="submit"

              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"

            >

              Save Transaction

            </button>



          </form>


        </div>


      </div>


    </Layout>

  );

}


export default CreateTransaction;