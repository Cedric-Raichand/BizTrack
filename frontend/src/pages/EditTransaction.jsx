import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";


function EditTransaction() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    type: "income",
    title: "",
    amount: "",
    category: "",
    description: "",
  });



  useEffect(() => {

    fetchTransaction();

  }, []);




  const fetchTransaction = async () => {

    try {

      const res = await API.get(`/transactions/${id}`);


      setFormData({

        type: res.data.type,
        title: res.data.title,
        amount: res.data.amount,
        category: res.data.category,
        description: res.data.description,

      });


    } catch(error){

      console.log(error);

      alert("Failed to load transaction");

    }

  };





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      await API.put(
        `/transactions/${id}`,
        formData
      );


      alert("Transaction updated successfully");


      navigate("/dashboard");


    } catch(error){

      alert(
        error.response?.data?.message ||
        "Update failed"
      );

    }

  };






  return (

    <div>


      <h1>
        Edit Transaction
      </h1>



      <form onSubmit={handleSubmit}>


        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
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

        />



        <br /><br />



        <input

          type="number"

          name="amount"

          placeholder="Amount"

          value={formData.amount}

          onChange={handleChange}

        />



        <br /><br />



        <input

          type="text"

          name="category"

          placeholder="Category"

          value={formData.category}

          onChange={handleChange}

        />



        <br /><br />



        <textarea

          name="description"

          placeholder="Description"

          value={formData.description}

          onChange={handleChange}

        />



        <br /><br />



        <button type="submit">

          Update Transaction

        </button>



      </form>


    </div>

  );

}


export default EditTransaction;