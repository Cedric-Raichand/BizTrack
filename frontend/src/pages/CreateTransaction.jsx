import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreateTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "income",
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", formData);

      alert("Transaction added successfully!");

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add transaction"
      );
    }
  };

  return (
    <div>
      <h1>Add Transaction</h1>

      <form onSubmit={handleSubmit}>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
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
          Save Transaction
        </button>

      </form>
    </div>
  );
}

export default CreateTransaction;