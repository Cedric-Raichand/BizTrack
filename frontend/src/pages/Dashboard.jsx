import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {

  const { user } = useAuth();

  const [business, setBusiness] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState("");



  useEffect(() => {

    fetchBusiness();

  }, []);




  useEffect(() => {

    fetchTransactions();

  }, [typeFilter]);





  const fetchBusiness = async () => {

    try {

      const res = await API.get("/business");

      setBusiness(res.data);

    } catch (error) {

      console.log(error);

    }

  };





  const fetchTransactions = async () => {

    try {

      let url = "/transactions";

      if (typeFilter) {

        url += `?type=${typeFilter}`;

      }

      const res = await API.get(url);

      setTransactions(res.data.transactions || []);

    } catch (error) {

      console.log(error);

    }

  };





  const deleteTransaction = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/transactions/${id}`);

      alert("Transaction deleted successfully");

      fetchTransactions();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete transaction"
      );

    }

  };





  const filteredTransactions = transactions.filter((transaction) =>

    transaction.title
      .toLowerCase()
      .includes(search.toLowerCase())

  );





  const totalIncome = filteredTransactions

    .filter((transaction) => transaction.type === "income")

    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );





  const totalExpenses = filteredTransactions

    .filter((transaction) => transaction.type === "expense")

    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );





  const balance = totalIncome - totalExpenses;





  return (

    <Layout>

      <div className="space-y-8">




        <div>

          <h1 className="text-3xl font-bold">

            Welcome, {user?.name}

          </h1>

          <p className="text-gray-500">

            {user?.email}

          </p>

        </div>






        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">

            Business Information

          </h2>

          {business ? (

            <div className="space-y-2">

              <p>

                <strong>Name:</strong> {business.businessName}

              </p>

              <p>

                <strong>Category:</strong> {business.category}

              </p>

              <p>

                <strong>Description:</strong> {business.description}

              </p>

              <p>

                <strong>Location:</strong> {business.location}

              </p>

            </div>

          ) : (

            <p>No business found.</p>

          )}

        </div>






        <div>

          <h2 className="text-2xl font-bold mb-5">

            Financial Summary

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <SummaryCard

              title="Total Income"

              amount={totalIncome}

            />

            <SummaryCard

              title="Total Expenses"

              amount={totalExpenses}

            />

            <SummaryCard

              title="Balance"

              amount={balance}

            />

          </div>

        </div>







        <div className="flex gap-4">

          <Link to="/create-business">

            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">

              Create Business

            </button>

          </Link>

          <Link to="/create-transaction">

            <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">

              Add Transaction

            </button>

          </Link>

        </div>








        <div className="flex gap-4">

          <input

            type="text"

            placeholder="Search transaction..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="flex-1 border rounded-lg p-3"

          />



          <select

            value={typeFilter}

            onChange={(e) => setTypeFilter(e.target.value)}

            className="border rounded-lg p-3"

          >

            <option value="">All</option>

            <option value="income">Income</option>

            <option value="expense">Expense</option>

          </select>

        </div>








        <TransactionTable

          transactions={filteredTransactions}

          onDelete={deleteTransaction}

        />



      </div>

    </Layout>

  );

}

export default Dashboard;