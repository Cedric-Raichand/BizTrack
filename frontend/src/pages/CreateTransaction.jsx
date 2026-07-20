import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CreateTransaction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const [error, setError] = useState("");

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

      alert("Transaction added successfully");

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add transaction"
      );
    }
  };

  return (
    <div>
      <h1>Add Transaction</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <br />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Save Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;