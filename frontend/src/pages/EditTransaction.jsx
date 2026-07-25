import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";
import Layout from "../components/Layout";

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

    } catch (error) {
      console.log(error);
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

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update transaction"
      );

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
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="4"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Update Transaction
            </button>

          </form>

        </div>

      </div>

    </Layout>

  );
}

export default EditTransaction;