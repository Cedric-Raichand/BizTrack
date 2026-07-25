import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { toast } from "react-toastify";


function CreateTransaction() {

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);



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

      setLoading(true);



      await API.post(

        "/transactions",

        formData

      );



      toast.success(
        "Transaction added successfully"
      );



      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);



    } catch (error) {


      toast.error(

        error.response?.data?.message ||

        "Failed to add transaction"

      );


    } finally {


      setLoading(false);


    }


  };







  return (

    <div>


      <h1>
        Add Transaction
      </h1>





      <form onSubmit={handleSubmit}>


        <select

          name="type"

          value={formData.type}

          onChange={handleChange}

          disabled={loading}

        >

          <option value="income">
            Income
          </option>


          <option value="expense">
            Expense
          </option>


        </select>





        <br /><br />





        <input

          type="text"

          name="title"

          placeholder="Title"

          value={formData.title}

          onChange={handleChange}

          disabled={loading}

        />





        <br /><br />





        <input

          type="number"

          name="amount"

          placeholder="Amount"

          value={formData.amount}

          onChange={handleChange}

          disabled={loading}

        />





        <br /><br />





        <input

          type="text"

          name="category"

          placeholder="Category"

          value={formData.category}

          onChange={handleChange}

          disabled={loading}

        />





        <br /><br />





        <textarea

          name="description"

          placeholder="Description"

          value={formData.description}

          onChange={handleChange}

          disabled={loading}

        />





        <br /><br />





        <button

          type="submit"

          disabled={loading}

        >

          {

            loading ?

            "Saving..." :

            "Save Transaction"

          }


        </button>





      </form>


    </div>

  );

}


export default CreateTransaction;