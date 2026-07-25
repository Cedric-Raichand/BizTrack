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



  useEffect(() => {

    fetchBusiness();

    fetchTransactions();

  }, []);



  const fetchBusiness = async () => {

    try {

      const res = await API.get("/business");

      setBusiness(res.data);


    } catch(error) {

      console.log(error);

    }

  };



  const fetchTransactions = async () => {

    try {

      const res = await API.get("/transactions");

      setTransactions(res.data.transactions || []);


    } catch(error) {

      console.log(error);

    }

  };



  const totalIncome = transactions

    .filter(
      (transaction) => transaction.type === "income"
    )

    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );



  const totalExpenses = transactions

    .filter(
      (transaction) => transaction.type === "expense"
    )

    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );



  const balance = totalIncome - totalExpenses;



  return (

    <Layout>

      <div className="space-y-8">


        {/* Welcome Section */}

        <div>

          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>


          <p className="text-gray-500">
            {user?.email}
          </p>

        </div>




        {/* Business Information */}

        <div className="bg-white shadow rounded-xl p-6">


          <h2 className="text-2xl font-bold mb-4">
            Business Information
          </h2>



          {business ? (

            <div className="space-y-2">


              <p>
                <strong>Name:</strong>{" "}
                {business.businessName}
              </p>


              <p>
                <strong>Category:</strong>{" "}
                {business.category}
              </p>


              <p>
                <strong>Description:</strong>{" "}
                {business.description}
              </p>


              <p>
                <strong>Location:</strong>{" "}
                {business.location}
              </p>


            </div>


          ) : (

            <p className="text-gray-500">
              No business found.
            </p>

          )}


        </div>





        {/* Summary Cards */}

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






        {/* Actions */}

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







        {/* Transactions */}

      <TransactionTable
        transactions={transactions}
      />


      </div>


    </Layout>

  );

}


export default Dashboard;